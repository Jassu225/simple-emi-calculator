import React, { Component } from 'react';
import './slider.css';

class Slider extends Component {
  constructor(props) {
    super(props);
    this.slider = React.createRef();
    this.handle = React.createRef();
    // console.log(this.props.steps);
    this.sliderObject = {
      totalPoints: 0,
      handleInfo: {
        value: 0,
        pageX: -1,
        pageY: -1,
        drag: false
      },
      min: 0,
      max: 0,
      steps: [],
      onSlide: null
    }
    this.state = {
      handleValue: this.sliderObject.handleInfo.value,
      handleLabelStyle: {}
    };
  }

  componentWillMount() {
    let steps = this.props.steps;
    if(Array.isArray(steps) && steps.length > 0) {
      this.sliderObject.steps = steps;
      this.sliderObject.totalPoints = steps.length - 1;
      this.sliderObject.max = steps.length - 1;
      this.sliderObject.onSlide = this.props.onSlide && typeof this.props.onSlide === "function" ? this.props.onSlide : null;
    }
  }

  componentDidMount() {
    window.setTimeout(() => {
      let steps = this.props.steps;
      if(Array.isArray(steps) && steps.length > 0) {
        // document.removeEventListener("mousedown", dragElement);
        document.addEventListener("mousemove", this.dragElement);
        document.addEventListener("mouseup", this.mouseUpHandler);
        // // calculate pageX and pageY initially
        // this.dispatchMouseEvent("mousedown", this.handle.current);
        // this.sliderObject.handleInfo.drag = false;
        if (this.props.showHandleLabel) {
          window.addEventListener("resize", this.adjustHandleLabel);
          this.dispatchEvent("resize", window);
        }
      }
    },0);
  }

  getWidth(font, txt) {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    ctx.font = font;
    return ctx.measureText(txt).width + "px";
  }

  adjustHandleLabel = event => {
    let element = this.handle.current.children[0];
    let computedStyle = window.getComputedStyle(element);
    let font = computedStyle.getPropertyValue('font-size') + " '" + computedStyle.getPropertyValue('font-family') + "'";
    let handleLabelWidth = this.getWidth(font, element.textContent)
    this.setState(state => ({
      handleLabelStyle: {
        width: "calc(" + handleLabelWidth + " + 1rem)",
        left: "calc((-" + handleLabelWidth + " / 2) - 0.5rem + 4px)"
      }
    }));
  }

  mouseUpHandler = _=> {
    this.sliderObject.handleInfo.drag = false;
  }

  handleMouseDown = event => {
    event.stopPropagation();
    let element = event.target;
    let clientRect = element.getBoundingClientRect();
    this.sliderObject.handleInfo.pageX = clientRect.left + clientRect.width / 2;
    this.sliderObject.handleInfo.pageY = clientRect.top + clientRect.height / 2;
    this.sliderObject.handleInfo.drag = true;
    // this.slider = slider[0];
    // slider[0].selectedHandle = this;
  }

  dispatchEvent(eventType, element) {
    let event = new Event(eventType, {
      view: window,
      bubbles: true,
      cancelable: false
    });
    element.dispatchEvent(event);
  }

  calcPosition(value, min, totalPoints, handleEl) {
    // console.log(value);
    let val = (value - min) / totalPoints * 100 + "%";
    return "calc(" + val + " - " + (handleEl.getBoundingClientRect().width / 2) + "px)";
  }

  dragElement = event => {
    if (!this.sliderObject.handleInfo.drag) return false;
    // debugger
    let slider = this.slider.current;
    let handle = this.handle.current, handleData = this.sliderObject.handleInfo;
    let preValue = handleData.value, newValue = preValue;
    // calculate new value
    let object = this.sliderObject;
    let totalPoints = object.totalPoints;
    let min = object.min, max = object.max;
    let sliderClientRect = slider.getBoundingClientRect();
    let sliderWidth = sliderClientRect.width, pointWidth = sliderWidth / totalPoints;
    let offsetWidth = event.pageX - handleData.pageX;
    newValue = preValue + (offsetWidth < 0 ? -Math.round((-offsetWidth) / pointWidth) : Math.round(offsetWidth / pointWidth));
    if (newValue < min)
      newValue = min;
    else if (newValue > max)
      newValue = max;
    
    let data = {value: object.steps[newValue]};
    if (this.props.data)
      data = {...data, userData: this.props.data};
    if (newValue != preValue && newValue >= min && newValue <= max && 
    ((object.onSlide && typeof object.onSlide === "function") || !object.onSlide)) {
        // this.setState({handleStyle: { 
        //   left: this.calcPosition(newValue, min, totalPoints, handleClientRect.width)
        // }});
        handle.style.left = this.calcPosition(newValue, min, totalPoints, handle);
        let handleClientRect = handle.getBoundingClientRect();
        handleData.pageX = handleClientRect.left + handleClientRect.width / 2;
        handleData.pageY = handleClientRect.top + handleClientRect.height / 2;
        handleData.value = newValue;
        this.setState(state => ({...state, handleValue: newValue}), _=> this.dispatchEvent("resize", window));
        // handle.data.values[i] = newValue;
        //console.log(newValue);
        return ((object.onSlide && typeof object.onSlide === "function" && object.onSlide(event, data)) || !object.onSlide);
    }
  }

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
            {this.sliderObject.steps[this.state.handleValue]}
          </div>
        }
        </div>
      </div>);
  }
}

export default Slider;
