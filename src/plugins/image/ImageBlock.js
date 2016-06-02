/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import Radium from "radium";
import React, {Component} from "react";
import ReactCrop from "react-image-crop";

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
    this._handleCaptionChange = ::this._handleCaptionChange;
    this._handleRightsHolderChange = ::this._handleRightsHolderChange;

    this.defaultFeatured = "medium";
    this.featuredOptions = [
      {"key": "small", "icon": icons.MediaSmallIcon, "label": "SMALL"},
      {"key": "medium", "icon": icons.MediaMediumIcon, "label": "MEDIUM"},
      {"key": "big", "icon": icons.MediaBigIcon, "label": "BIG"}
    ];
    this.actions = [
      {"key": "edit", "icon": icons.EditIcon, "action": this._handleEdit},
      {"key": "delete", "icon": icons.DeleteIcon, "action": this.props.container.remove}
    ];
  }

  _handleCrop(data) {
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
          <ReactCrop
            crop={this.props.data.crop}
            style={ImageBlockStyle.image}
            src={this.props.data.src}
            onComplete={this._handleCrop}
            keepSelection={true} />
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
