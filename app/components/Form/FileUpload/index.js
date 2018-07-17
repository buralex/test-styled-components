
import React from 'react'
import PropTypes from "prop-types";
import Dropzone from 'react-dropzone';
import debounce  from 'lodash/debounce';
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';

import './style.scss';

export default class FileUpload extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            file: null,
            error: false,
        };
    }

    componentDidUpdate(prevProps) {
        this.onUpdate(prevProps);
    }

    componentWillUnmount() {
        if (this.state.file) {
            window.URL.revokeObjectURL(this.state.file.preview);
        }
    }

    onUpdate = (prevProps) => {
        // clear values
        if (!prevProps.meta.pristine && this.props.meta.pristine) {
            this.setState({
                file: null,
            });
        }
    }

    onDrop = (files) => {
        const [file] = files;

        this.props.input.onChange(file);
        this.setState({
            file,
        });
    }

    onPreviewLoad = ({target: img}) => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;

        if (this.props.validateImgSize) {
            const {minWidth, minHeight} = this.props.validateImgSize;

            if ( width < minWidth || height < minHeight ) {
                this.setState({
                    error: `Image is too small, minimum 300x300 px! (your image is ${width}x${height} px)`,
                });
            } else {
                this.setState({
                    error: false,
                });
            }
        }
    }

    render() {

        const {
            input: {name}, placeholder, meta, meta: {dirty, error}, showValid, validText,
        } = this.props;

        const isInvalid = Boolean(dirty && (error || this.state.error));
        const isValid = Boolean(dirty && !error);

        return (
            <div className='fileUpload-component'>
                <FormGroup>
                    <Dropzone
                        name={name}
                        onDrop={this.onDrop}
                        className='dropzone'
                        activeClassName='active-dropzone'
                        multiple={false}
                    >
                        <div className="img-container">
                            {!this.state.file &&
                                <div>
                                    <h6>{placeholder.header}</h6>
                                    <p>{placeholder.text}</p>
                                </div>
                            }

                            {this.state.file &&
                                <img
                                    onLoad={this.onPreviewLoad}
                                    className="img-thumbnail"
                                    alt="preview"
                                    src={this.state.file.preview}
                                />
                            }
                        </div>
                    </Dropzone>

                    {isInvalid && <FormFeedback style={{display: 'block'}}>{error || this.state.error}</FormFeedback>}
                    {isValid && showValid && <FormFeedback style={{display: 'block'}} valid>{validText}</FormFeedback>}

                </FormGroup>
            </div>
        )
    }
}

