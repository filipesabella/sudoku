// barf
let interval = -1;
export class Timer {
  static start(): void {
    let ellapsed = 0;
    window.clearInterval(interval);
    interval = window.setInterval(() => {
      if (!document.hidden) {
        ellapsed += 1;
        document.getElementById('timer')!.innerHTML =
          formattedTime(ellapsed);
      }
    }, 1000);
  }
}

function formattedTime(t: number): string {
  const minutes = Math.floor(t / 60);
  const seconds = Math.floor(t % 60);
  return `${minutes}:${String(seconds).padStart(2, '0')}`
}
