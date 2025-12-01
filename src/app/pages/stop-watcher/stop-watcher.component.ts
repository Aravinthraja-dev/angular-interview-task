import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stop-watcher',
  standalone: true,
  imports: [

  ],
  templateUrl: './stop-watcher.component.html',
  styleUrl: './stop-watcher.component.scss'
})
export class StopWatcherComponent implements OnInit{
 
  interval: ReturnType<typeof setInterval> | null = null;
  elapsedMs: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  milliseconds: number = 0;
  startTime: number = 0;
  rafId: number | null = null;
  laps: any[] = [];
  lastLapTime: number = 0;
  isRunning: boolean = false;
  isLap: boolean = false;
  isLapDisable: boolean = false;

   ngOnInit(): void {
    this.isLapDisable = true;
  }

  start_timer() {
    if (this.isRunning) return

    this.startTime = performance.now() - this.elapsedMs;
    this.isRunning = true;

    const tick = (now: number) => {
      const current = now ?? performance.now();
      this.elapsedMs = Math.floor(current - this.startTime);

      this.milliseconds = this.elapsedMs % 1000;
      this.seconds = Math.floor((this.elapsedMs / 1000) % 60);
      this.minutes = Math.floor((this.elapsedMs / 60000) % 60);

      this.rafId = requestAnimationFrame(tick);
      this.isLapDisable = false;
    }
    this.rafId = requestAnimationFrame(tick);
    this.isLap = false;
  }

  lap_timer() {
    const total = this.elapsedMs;                  
    const lap = total - this.lastLapTime;           

    this.laps.push({
      lapNumber: this.laps.length + 1,
      lapTime: this.formatTime(lap),                
      overallTime: this.formatTime(total)          
    });

    this.lastLapTime = total;                       
  }

  formatTime(ms: number) {
    const totalMs = Math.floor(ms);                     

    const milliseconds = totalMs % 1000;
    const seconds = Math.floor((totalMs / 1000) % 60);
    const minutes = Math.floor((totalMs / 60000) % 60);

    return `${this.pad(minutes)}:${this.pad(seconds)}.${this.pad(milliseconds, 3)}`;
  }


  stop_timer() {
    if (!this.isRunning) return
    this.isRunning = false;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
    this.isLap = true;
  }

  reset_timer() {
    this.stop_timer();
    this.elapsedMs = 0;
    this.minutes = this.seconds = this.milliseconds = 0;
    this.isLap = false;
    this.isLapDisable = true;
  }

  pad(num: number, size: number = 2) {
    return num.toString().padStart(size, '0');
  }
}