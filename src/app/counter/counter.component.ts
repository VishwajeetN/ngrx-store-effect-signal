import { Component, computed, effect, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../states/app.state';
import { selectCount } from '../states/counter/counter.selector';
import { AsyncPipe } from '@angular/common';
import { decrement, increment, reset } from '../states/counter/counter.actions';
import { CounterStore } from '../store/counter.store';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss',
  providers: [CounterStore], // Register CounterStore in providers (For Signal)
})
export class CounterComponent {
  count$: Observable<number>;

  //// Using basic Signal concept - Initialize signal property with 0
  count = signal(0);
  //// Using basic Signal computed concept.
  double = computed(() => this.count() * 2);

  //// Ngrx Signal
  counterStore = inject(CounterStore);

  constructor(private store: Store<AppState>) {
    this.count$ = this.store.select(selectCount);
    //// Using basic Signal effect concept
    effect(() => {
      console.log('Current value of count : ' + this.count());
    })
  }

  increment() {
    //// using the NgRX
    this.store.dispatch(increment());

    //// Using the basic Signal update concept
    //// this.count.update((prevNumber) => prevNumber + 1);
  }

  decrement() {
    //// using the Ngrx
    this.store.dispatch(decrement());

    /// Using the basic Signal update concept
    //// this.count.update((prevNumber) => prevNumber - 1);
  }

  reset() {
    //// using the Ngrx
    this.store.dispatch(reset());

    //// Using the basic Signal set concept
    // // this.count.set(0);
  }
}
