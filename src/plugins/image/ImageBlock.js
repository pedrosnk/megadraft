/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import Radium from "radium";
import React, {Component} from "react";
import Cropper from "react-cropper";

import {
  BlockContent,
  BlockData,
  BlockInput,
  CommonBlock
} from "../../components/plugin";

import icons from "../../icons";

import ImageBlockStyle from "./ImageBlockStyle";


export default @Radium
class ImageBlock extends Component {
  constructor(props) {
    super(props);

    this._handleCrop = ::this._handleCrop;
    this._handleCropEnd = ::this._handleCropEnd;
    this._handleCaptionChange = ::this._handleCaptionChange;
    this._handleRightsHolderChange = ::this._handleRightsHolderChange;

    this.defaultFeatured = "medium";
    this.featuredOptions = [
      {"key": "small", "icon": icons.MediaSmallIcon, "label": "SMALL"},
      {"key": "medium", "icon": icons.MediaMediumIcon, "label": "MEDIUM"},
      {"key": "big", "icon": icons.MediaBigIcon, "label": "BIG"}
    ];
    this.actions = [
      {"key": "crop", "icon": icons.CropIcon, "action": this._handleCrop},
      {"key": "edit", "icon": icons.EditIcon, "action": this._handleEdit},
      {"key": "delete", "icon": icons.DeleteIcon, "action": this.props.container.remove}
    ];

    this.state = {
      cropStatus: false
    };
  }

  _handleCrop(data) {
    console.log(this.state.cropStatus);
    if (this.state.cropStatus) {
      this.refs.cropper.disable();
      this.setState({cropStatus: false});
    } else {
      this.refs.cropper.enable();
      this.setState({cropStatus: true});
    }
  }

  _handleCropEnd(data) {
    console.log(data);
    //console.log(this.refs.cropper.getCroppedCanvas().toDataURL());
    this.props.container.updateEntity({crop: data});
  }

  _handleEdit() {
  }

  _handleCaptionChange(event) {
    this.props.container.updateEntity({caption: event.target.value});
  }

  _handleRightsHolderChange(event) {
    this.props.container.updateEntity({rightsHolder: event.target.value});
  }

  render(){
    return (
      <CommonBlock {...this.props} featuredOptions={this.featuredOptions} actions={this.actions} defaultFeatured={this.defaultFeatured}>
        <BlockContent>
          <Cropper
            ref='cropper'
            enable={false}
            style={ImageBlockStyle.image}
            src={this.props.data.src}
            aspectRatio={16 / 9}
            guides={false}
            zoomable={false}
            crop={this._handleCropEnd} />
        </BlockContent>

        <BlockData>
          <BlockInput
            placeholder="Caption"
            value={this.props.data.caption}
            onChange={this._handleCaptionChange} />

          <BlockInput
            placeholder="Rights Holder"
            value={this.props.data.rightsHolder}
            onChange={this._handleRightsHolderChange} />
        </BlockData>
      </CommonBlock>
    );
  }
};
