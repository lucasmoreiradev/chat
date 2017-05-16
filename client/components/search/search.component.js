'use strict';

import { Component } from '@angular/core';

@Component({
  selector: 'search',
  template: `
    <form name="search-bar">
      <input type="search" name="search" placeholder="Procure por pessoas">
    </form>
  `
})
export class SearchComponent {}
