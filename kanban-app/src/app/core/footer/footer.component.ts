import { Component, Input, OnInit } from '@angular/core';
import { DEVELOPER, DEVELOPERS } from 'src/app/developers';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  developers = DEVELOPERS;

  getGitIcon(author: DEVELOPER) {
    return {
      'background-image': `url('assets/img/footer_git_${author.id}.svg')`,
    };
  }
}
