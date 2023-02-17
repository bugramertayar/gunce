import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss'],
})
export class ArticleEditorComponent implements OnInit {
  @Input() htmlInputModel = '';
  @Output() articleContentChanged: EventEmitter<string>;

  atValues = [
    { id: 1, value: 'Buğra Mert Ayar', link: 'https://google.com' },
    { id: 2, value: 'Anil Şülekoğlu' },
  ];
  hashValues = [
    { id: 3, value: 'Buğra Mert Ayar' },
    { id: 4, value: 'Anil Şülekoğlu' },
  ];

  quillConfig = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],
        ['code-block'],
        [{ header: 1 }, { header: 2 }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['clean'],
        ['link'],
      ],
    },

    mention: {
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ['@', '#'],
      source: (searchTerm: any, renderList: any, mentionChar: any) => {
        let values;

        if (mentionChar === '@') {
          values = this.atValues;
        } else {
          values = this.hashValues;
        }

        if (searchTerm.length === 0) {
          renderList(values, searchTerm);
        } else {
          const matches = [];
          for (var i = 0; i < values.length; i++)
            if (
              ~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())
            )
              matches.push(values[i]);
          renderList(matches, searchTerm);
        }
      },
    },
    'emoji-toolbar': true,
    'emoji-textarea': false,
    'emoji-shortname': true,
    keyboard: {
      bindings: {
        enter: {
          key: 13,
          handler: (range: any, context: any) => {
            return true;
          },
        },
      },
    },
  };

  constructor() {
    this.articleContentChanged = new EventEmitter();
  }

  ngOnInit(): void {}

  onContentChanged = (event: any) => {
    this.articleContentChanged.emit(event?.html);
  };
}
