import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SentimentService {

  constructor() {
    
   }

  async checkPass(text:string):Promise<any> {
    var Sentiment = require('sentiment');
    var sentiment = new Sentiment();
    var options = {
      labels: {"dio": -5}
    };
    sentiment.registerLanguage('it', options);
    var result = sentiment.analyze(text, { language: 'it' });
    return result['score'];
  }

}
