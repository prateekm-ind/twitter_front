import { Component, OnInit } from '@angular/core';
import { PostModel } from '../shared/post.model';
import { PostService } from '../shared/post.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  posts$: Array<PostModel>= [];

  constructor(private postservice: PostService) {
   }

  ngOnInit(): void {
    this.postservice.getAllPosts().subscribe( post=>{
      this.posts$ = post;
  })
  }

}
