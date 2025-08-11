import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from './chat.service';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  isOpen = false;
  messages = signal<string[]>([]);
  newMessage = signal('');
  private destroy$ = new Subject<void>();
  user = { name: 'John', status: 'online' };
  constructor(private chat: ChatService) {
  }
  ngOnInit() {
    this.chat.startMock();

    this.chat.messages$
      .pipe(takeUntil(this.destroy$))
      .subscribe(msg =>
        this.messages.update(list => [...list, msg])
      );
  }
  toggle() {
    this.isOpen = !this.isOpen;
  }
  send() {
    const text = this.newMessage().trim();
    if (!text) return;
    this.chat.send(text);
    this.newMessage.set('');
  }

  toggleStatus() {
    this.user.status = this.user.status === 'online' ? 'offline' : 'online';
  }

  ngOnDestroy(): void {

  }
}
