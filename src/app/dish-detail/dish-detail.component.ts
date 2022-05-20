import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { DishService } from '../services/dish.service';
import { Dish } from '../shared/dish';

const DISH = {
    id: '0',
    name: 'Uthappizza',
    image: '/assets/images/uthappizza.png',
    category: 'mains',
    featured: true,
    label: 'Hot',
    price: '4.99',
    // tslint:disable-next-line:max-line-length
    description: 'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
    comments: [
         {
             rating: 5,
             comment: 'Imagine all the eatables, living in conFusion!',
             author: 'John Lemon',
             date: '2012-10-16T17:57:28.556094Z'
         },
         {
             rating: 4,
             comment: 'Sends anyone to heaven, I wish I could get my mother-in-law to eat it!',
             author: 'Paul McVites',
             date: '2014-09-05T17:57:28.556094Z'
         },
         {
             rating: 3,
             comment: 'Eat it, just eat it!',
             author: 'Michael Jaikishan',
             date: '2015-02-13T17:57:28.556094Z'
         },
         {
             rating: 4,
             comment: 'Ultimate, Reaching for the stars!',
             author: 'Ringo Starry',
             date: '2013-12-02T17:57:28.556094Z'
         },
         {
             rating: 2,
             comment: 'It\'s your birthday, we\'re gonna party!',
             author: '25 Cent',
             date: '2011-12-02T17:57:28.556094Z'
         }
     ]
  };

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.scss']
})
export class DishDetailComponent implements OnInit {
  @ViewChild('fform') commentFormDirective: any;
  dish!: Dish;
  dishIds!: string[];
  prev!: string;
  next!: string;
  commentForm: any;

  formErrors: any = {
    'author': '',
    'comment': '',
  };

  validationMessages: any = {
    'author': {
      'required': 'Author is required.',
      'minlength': 'Author must be at least 2 characters long.',
    },
    'comment': {
      'required': 'Comment is required.',
    },
  };

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2)] ],
      rating: [5],
      comment: ['', [Validators.required] ],
    })

    this.commentForm.valueChanges.subscribe((data: any) => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    const comment = this.commentForm.value;
    const d = new Date();
    comment.date = d.toISOString()
    console.log(comment);
    this.dish.comments.push({...comment})
    this.commentFormDirective.resetForm();
    this.commentForm.reset({
      author: '',
      rating: 5,
      comment: '',
    });
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
}
