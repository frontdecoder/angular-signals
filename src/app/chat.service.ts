import { Injectable } from '@angular/core';
import { Subject, Observable, interval, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private _messages$ = new Subject<string>();
  readonly messages$: Observable<string> = this._messages$.asObservable();

  startMock() {
    interval(1500).pipe(take(5)).subscribe(i => {
      this._messages$.next(`server: message #${i + 1}`);
    });
  }
  send(msg: string) {
    this._messages$.next(`you: ${msg}`);
  }

}
