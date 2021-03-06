import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product: any;
  @Input() action = true;
  @Input() showAllAttributes = true;
  content = '';
  maxAttributesCount = 18;

  constructor( private router: Router) {}

  ngOnInit() {
    if (this.product._source) {
      let pd = '<b>Product Dimensions</b>: ';
      let count = 0;
      for (const key in this.product._source) {
        if (['brand', 'title', 'price', 'image_url', 'Weight0'].includes(key)) {
          continue;
        } else if (this.product._source.hasOwnProperty(key)) {
          const element = this.product._source[key];
          if (['Product Dimensions0', 'Product Dimensions1', 'Product Dimensions2',
          'Package Dimensions0', 'Package Dimensions1', 'Package Dimensions2' ].includes(key)) {
            pd +=  element + ' x ';
            if (['Product Dimensions2', 'Package Dimensions2'].includes(key)) {
              this.content += pd.slice(0, pd.length - 2) + 'cm <br>';
              count++;
            }
            continue;
          }
          this.content += '<b>' + key + '</b>' + ': ' + element + '<br>';
          count++;
        }
        if (!this.showAllAttributes && count >= this.maxAttributesCount) {
          break;
        }
      }
    }
  }

  private getSimilar(card) {
    this.router.navigate(['similar'], {queryParams: {i: card._index, t: card._type, id: card._id}});
  }

}
