import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="row logo-top">
      <a href="/"><img class="center-block img-responsive" src="/assets/img/ja.png"></a>
    </div>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class AppComponent {
}
