import React, { Component } from 'react';
import './slider.css';

// An independent plugin
class Slider extends Component {
  constructor(props) {
    super(props);
    // used to get the dimensions & offset of the slider
    this.slider = React.createRef();
    // used to get the dimensions & offset of the handle
    // also used to set the handle position & handle label's dimensions
    this.handle = React.createRef();
    this.sliderObject = {
      totalPoints: 0, // no. of divisions in the slider (usually equals to [no. of steps] - 1)
      handleInfo: {
        value: 0, // stores handle index
        pageX: -1, // stores handle's offsetX
        pageY: -1, // stores handle's offsetY
        drag: false // used to determine whether handle is being dragged by the user
      },
      min: 0,
      max: 0,
      steps: [], // array of all possible values in the slider
      // slide events
      onSlide: null,
      onSlideEnd: null
    }
    this.state = {
      handleLabelStyle: {}
    };
  }

  // used to determine whether or not to update the component
  shouldComponentUpdate(newProps, newState) {
    return (
      (JSON.stringify(this.state) != JSON.stringify(newState))
      || (JSON.stringify(this.props)) != JSON.stringify(newProps)
    );
  }

  componentWillMount() {
    let steps = this.props.steps;
    if(Array.isArray(steps) && steps.length > 0) {
      // initialing slider object
      this.sliderObject.steps = steps;
      this.sliderObject.totalPoints = steps.length - 1;
      this.sliderObject.max = steps.length - 1;
      this.sliderObject.onSlide = this.props.onSlide && typeof this.props.onSlide === "function" ? 
              this.props.onSlide : null;
      this.sliderObject.onSlideEnd = this.props.onSlideEnd && typeof this.props.onSlideEnd === "function" ? 
              this.props.onSlideEnd : null;
    }
  }

  componentDidMount() {
    window.setTimeout(() => {
      let steps = this.props.steps;
      if(Array.isArray(steps) && steps.length > 0) {
        // used to calculate the new position of the handle
        document.removeEventListener("mousedown", this.dragElement);
        document.addEventListener("mousemove", this.dragElement);
        // used to notify the user (using onSlideEnd) when the dragging stops
        document.removeEventListener("mouseup", this.mouseUpHandler);
        document.addEventListener("mouseup", this.mouseUpHandler);
        // handle label is optional,
        // if enabled, its' dimensions should be calculated upon window resize
        if (this.props.showHandleLabel) {
          // to calculate dimensions initially
          window.addEventListener("resize", this.adjustHandleLabel);
          this.dispatchEvent("resize", window);
        }
      }
    },0);
  }

  // used to get the index in the array given the value
  getIndex = (value) => {
    let index = this.sliderObject.steps.findIndex(val => val === value);
    return index > -1 ? index : 0;
  }

  componentDidUpdate() {
    // console.log('updated');
    let actualValue = "", useValue = false;;
    if(this.props.value) {
      actualValue = this.props.value;
    } else
      useValue = true;
    this.sliderObject.handleInfo.value = this.getIndex(actualValue);
    let {min, totalPoints} = this.sliderObject;  
    let hanldeEl = this.handle.current;
    this.sliderObject.handleInfo.value = useValue ? this.sliderObject.handleInfo.value : this.getIndex(actualValue);
    hanldeEl.style.left = this.calcPosition(this.sliderObject.handleInfo.value, min, totalPoints, hanldeEl);
    if (this.props.showHandleLabel) {
      window.setTimeout(_=> this.dispatchEvent("resize", window), 0);
    }
  }

  // using canvas to measure the width of handle label's content
  getWidth(font, txt) {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    ctx.font = font;
    return ctx.measureText(txt).width + "px";
  }

  // to update dimensions of the handle label upon window resize
  adjustHandleLabel = event => {
    let element = this.handle.current.children[0];
    let computedStyle = window.getComputedStyle(element);
    let font = computedStyle.getPropertyValue('font-size') + " '" + computedStyle.getPropertyValue('font-family') + "'";
    let handleLabelWidth = this.getWidth(font, element.textContent)
    this.setState({
      handleLabelStyle: {
        width: "calc(" + handleLabelWidth + " + 1rem)",
        left: "calc((-" + handleLabelWidth + " / 2) - 0.5rem + 4px)"
      }
    });
  }

  // to update handle status and also to call onSlideEnd event
  mouseUpHandler = event => {
    if (this.sliderObject.handleInfo.drag) {
      this.sliderObject.handleInfo.drag = false;
      if (this.sliderObject.onSlideEnd && typeof this.sliderObject.onSlideEnd === "function") {
        let data = {value: this.sliderObject.steps[this.sliderObject.handleInfo.value], handleInDrag: false};
        if (this.props.data)
          data = {...data, userData: this.props.data};
        this.sliderObject.onSlideEnd(event, data);
      }
    }
  }

  // to get handle offset and also to update handle status
  handleMouseDown = event => {
    event.stopPropagation();
    let element = event.target;
    let clientRect = element.getBoundingClientRect();
    this.sliderObject.handleInfo.pageX = clientRect.left + clientRect.width / 2;
    this.sliderObject.handleInfo.pageY = clientRect.top + clientRect.height / 2;
    this.sliderObject.handleInfo.drag = true;
  }

  dispatchEvent(eventType, element) {
    let event = new Event(eventType, {
      view: window,
      bubbles: true,
      cancelable: false
    });
    element.dispatchEvent(event);
  }

  // to calculate handle position
  calcPosition(value, min, totalPoints, handleEl) {
    let val = (value - min) / totalPoints * 100 + "%";
    return "calc(" + val + " - " + (handleEl.getBoundingClientRect().width / 2) + "px)";
  }

  // to update handle position and also to call onSlide event
  dragElement = event => {
    if (!this.sliderObject.handleInfo.drag) return false;
    let slider = this.slider.current;
    let handle = this.handle.current, handleData = this.sliderObject.handleInfo;
    let preValue = handleData.value, newValue = preValue;
    // calculate new value
    let object = this.sliderObject;
    let totalPoints = object.totalPoints;
    let min = object.min, max = object.max;
    let sliderClientRect = slider.getBoundingClientRect();
    let sliderWidth = sliderClientRect.width, pointWidth = sliderWidth / totalPoints;
    let handleClientRect = handle.getBoundingClientRect();
    handleData.pageX = handleClientRect.left + handleClientRect.width / 2;
    handleData.pageY = handleClientRect.top + handleClientRect.height / 2;
    let offsetWidth = event.pageX - handleData.pageX;
    newValue = preValue + (offsetWidth < 0 ? -Math.round((-offsetWidth) / pointWidth) : Math.round(offsetWidth / pointWidth));
    if (newValue < min)
      newValue = min;
    else if (newValue > max)
      newValue = max;
    
    let data = {value: object.steps[newValue], handleInDrag: this.sliderObject.handleInfo.drag};
    if (this.props.data)
      data = {...data, userData: this.props.data};
    if (newValue != preValue && newValue >= min && newValue <= max && 
    ((object.onSlide && typeof object.onSlide === "function") || !object.onSlide)) {
        handleData.value = newValue;
        if(this.props.showHandleLabel) {
          this.dispatchEvent("resize", window);
        }
        return ((object.onSlide && typeof object.onSlide === "function" && object.onSlide(event, data)) || !object.onSlide);
    }
  }

  // to pass mousedown event to handle
  sliderMouseDown = event => {
    this.dispatchEvent("mousedown", this.handle.current);
    this.dragElement(event);
  }

  render() {
    return (
      <div className={"ui-slider" + (this.props.className ? " " + this.props.className : "")}
      ref={this.slider} onMouseDown={this.sliderMouseDown}>
        <div className="ui-slider-handle" tabIndex="1" draggable={false}
        ref={this.handle} onMouseDown={this.handleMouseDown} onDragStart={e => e.preventDefault()}
        >
        {this.props.showHandleLabel &&
          <div className="ui-slider-handle-label" style={this.state.handleLabelStyle}>
            {this.props.value}
          </div>
        }
        </div>
      </div>);
  }
}

export default Slider;
