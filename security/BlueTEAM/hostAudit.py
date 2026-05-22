import subprocess
import sys
import os
from datetime import datetime
from rich.console import Console
from rich.progress import Progress, SpinnerColumn, TextColumn, BarColumn, TaskProgressColumn
from rich.table import Table
from rich.panel import Panel

console = Console()

class SmartAuditor:
    def __init__(self):
        self.results = []
        self.start_time = datetime.now()
        # Rutas de bases de datos por defecto en Debian
        self.aide_db = "/var/lib/aide/aide.db.gz"
        self.rkhunter_prop = "/var/lib/rkhunter/db/rkhunter.dat"

    def run_silent(self, name, command):
        """Ejecuta comandos sin salida a terminal."""
        try:
            result = subprocess.run(
                command, 
                shell=True, 
                stdout=subprocess.DEVNULL, 
                stderr=subprocess.DEVNULL
            )
            return result.returncode
        except Exception:
            return -1

    def prepare_environment(self, progress):
        """Verifica e inicializa bases de datos si faltan."""
        prep_task = progress.add_task("[yellow]Optimizando entorno...", total=2)

        # 1. Verificar AIDE
        if not os.path.exists(self.aide_db):
            progress.update(prep_task, description="[yellow]Inicializando base AIDE (esto puede tardar)...")
            # En Debian aideinit es el wrapper estándar
            self.run_silent("AIDE Init", "aideinit -y -f")
        progress.update(prep_task, advance=1, description="[green]AIDE Listo")

        # 2. Verificar RKHunter
        if not os.path.exists(self.rkhunter_prop):
            progress.update(prep_task, description="[yellow]Actualizando propiedades RKHunter...")
            self.run_silent("RKH Prop", "rkhunter --propupd")
        progress.update(prep_task, advance=1, description="[green]RKHunter Listo")

    def execute_all(self):
        console.print(Panel("[bold cyan]Debian Sentinel v2.0[/bold cyan]\n[dim]Auditoría automatizada con gestión de dependencias[/dim]", expand=False))

        tasks = [
            ("AIDE (Integridad)", "aide --check"),
            ("RKHunter (Rootkits)", "rkhunter --check --sk --no-check-log"),
            ("Auditd (Servicio)", "systemctl is-active auditd"),
            ("Logwatch (Logs)", "logwatch --range today --detail low --print")
        ]

        with Progress(
            SpinnerColumn(),
            TextColumn("[progress.description]{task.description}"),
            BarColumn(bar_width=30),
            TaskProgressColumn(),
            console=console
        ) as progress:
            
            # Paso previo: Preparación
            self.prepare_environment(progress)
            
            # Paso principal: Auditoría
            main_task = progress.add_task("[cyan]Ejecutando auditoría...", total=len(tasks))
            for name, cmd in tasks:
                progress.update(main_task, description=f"[cyan]Analizando: {name}")
                exit_code = self.run_silent(name, cmd)
                
                status = "PASSED" if exit_code == 0 else "WARNING/INFO"
                if exit_code == -1: status = "ERROR"
                
                self.results.append({"herramienta": name, "estado": status})
                progress.update(main_task, advance=1)

    def show_summary(self):
        table = Table(title="\nRESULTADOS DE SEGURIDAD", title_style="bold white on blue", show_header=True, header_style="bold magenta")
        table.add_column("Módulo", style="dim", width=25)
        table.add_column("Estado", justify="center")

        for res in self.results:
            color = "green" if res["estado"] == "PASSED" else "yellow"
            if res["estado"] == "ERROR": color = "red"
            table.add_row(res["herramienta"], f"[{color}]{res['estado']}[/{color}]")

        console.print(table)
        duration = datetime.now() - self.start_time
        console.print(f"\n[bold]Finalizado en:[/bold] {duration.seconds}s | [bold green]Cero archivos temporales residuales.[/bold green]")

if __name__ == "__main__":
    if os.getuid() != 0:
        console.print("[bold red]❌ Error: Se requieren privilegios de ROOT.[/bold red]")
        sys.exit(1)

    auditor = SmartAuditor()
    auditor.execute_all()
    auditor.show_summary()
