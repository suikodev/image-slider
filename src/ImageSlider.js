import { html, LitElement } from 'lit-element';
import '@manufosela/multi-carousel';

export class ImageSlider extends LitElement {
  static get properties() {
    return {
      imageList: { type: Array, attribute: 'image-list' },
    };
  }

  constructor() {
    super();
    this.handleImageSelected = this.handleImageSelected.bind(this);
    this.addEventListener(
      'contextmenu',
      e => {
        e.preventDefault();
        this.shadowRoot?.getElementById('image-file')?.click();
      },
      false
    );
    this.imageList = [];
  }

  render() {
    return html`
      <multi-carousel>
        ${this.imageList.map(i => html`<img src=${i} alt="" />`)}
      </multi-carousel>
      <input
        type="file"
        accept="image/*"
        id="image-file"
        name="image-file"
        @change="${this.handleImageSelected}"
        style="display: none"
      />
    `;
  }

  handleImageSelected(e) {
    const { files } = e.target;
    const formData = new FormData();
    formData.append('imsdfage', files[0]);
    window
      .fetch('https://api.imgur.com/3/image', {
        headers: {
          Authorization: `Client-ID f6ba2d981f07a82`,
        },
        method: 'POST',
        body: formData,
      })
      .then(resp => {
        resp.json().then(value => {
          this.imageList.push(value.data.link);
        });
      });
  }
}
