import React, { Component } from 'react';
import {
  Input,
} from 'components';
import { withRouter } from 'react-router';
import axios from 'axios';
import { Lion as Button } from 'react-button-loaders';
import AWS from 'aws-sdk';

import styles from './styles.module.scss';
// import { connect } from 'react-redux';

const rekognition = new AWS.Rekognition();
const cloudwatchlogs = new AWS.CloudWatchLogs({ region: 'eu-central-1' });

class ImageInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 'custom',
      image: {},
      isLoading: false,
      response: '',
    };

    this.onClick = this.onClick.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.onTypeChange = this.onTypeChange.bind(this);
    this.downloadTxtFile = this.downloadTxtFile.bind(this);
  }

  onClick() {
    const {
      type,
      image,
    } = this.state;

    switch (type) {
    case 'custom': {
      this.setState({ isLoading: 'loading' });
      const parse = new FormData();
      parse.append('image', image);
      return axios({
        method: 'post',
        url: 'http://127.0.0.1:5000/files',
        data: parse,
        config: { headers: { 'Content-Type': 'multipart/form-data' } },
      })
        .then((response) => {
          this.setState({ isLoading: 'finished' });
          return this.setState({ response: response.data });
        })
        .catch((error) => { return console.log(error); });
    }
    case 'amazon':
      return null;
    default: return null;
    }
  }

  onTypeChange(event) {
    const {
      value,
    } = event.target;
    this.setState({ type: event.target.value });
  }

  downloadTxtFile() {
    const element = document.createElement('a');
    const file = new Blob([document.getElementById('text').value], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'myFile.txt';
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  onImageChange(event) {
    this.setState({ image: event.target.files[0] });
  }

  render() {
    const { response } = this.state;

    return (
      <div className={styles.wrap}>
        <label className={styles.label}>Service type</label>
        <select onChange={this.onTypeChange}>
          <option value="custom">Сustom</option>
          <option value="amazon">Amazon Rekognition</option>
        </select>
        <form className={styles.imageInput}>
          <label className={styles.upload}>
            <input
              onChange={this.onImageChange}
              type="file"
              name="upload_file"
            />
            {'Upload'}
          </label>
          <Button
            type="button"
            onClick={this.onClick}
            state={this.state.isLoading}
            textWhileLoading="Saving"
            className={styles.button}
          >
            {'Send'}
          </Button>
        </form>
        <Button
          type="button"
          //  onClick={this.downloadTxtFile}
          onClick={() => { return window.location.assign('http://localhost:3000'); }}
          className={styles.fullVersion}
        >
          {'Open full version'}
        </Button>
        <textarea
          id="text"
          value={response}
          rows="5"
          placeholder="Output text"
          className={styles.outputText}
        />
        <Button
          type="button"
          onClick={response && this.downloadTxtFile}
          className={styles.donwload}
        >
          {'Download file'}
        </Button>
      </div>
    );
  }
}
export default ImageInput;
