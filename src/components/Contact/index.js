import React, { Component } from 'react';
import styled from 'styled-components';
import { Row } from 'antd';
import { Fade } from 'react-reveal';
import { WebGLRenderer, PerspectiveCamera, Scene, Vector3 } from 'three';

import SeedScene from '../../objects/Scene.js';
import media from '../../helpers/media';

const Container = styled.div`
  height: 400px;
  width: 80%;

  ${media.sm`
    margin-top: 100px;
    height: 600px;
    width: 600px;
  `
  }
`;

const StyledRow = styled(Row)`
  height: 100vh;
  background-color: white;
`;

class Contact extends Component {
  constructor() {
    super();

    this.state = {
      innerHeight: window.innerHeight,
      innerWidth: window.innerWidth,
    };
  }

  componentDidMount() {
    this.width = this.mount.clientWidth;
    this.height = this.mount.clientHeight;

    console.log(this.mount, 'this.mount');
    console.log(this.width, 'width');
    console.log(this.height, 'height');

    this.scene = new Scene();
    this.camera = new PerspectiveCamera(
    );
    this.renderer = new WebGLRenderer({ antialias: true });
    this.seedScene = new SeedScene();


    // camera
    this.camera.position.set(6,3,-10);
    this.camera.lookAt(new Vector3(0,0,0));

    // renderer
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor('white', 1);
    this.mount.appendChild(this.renderer.domElement);

    // handle resize
    this.windowResizeHandler();
    window.addEventListener('resize', this.windowResizeHandler);

    this.scene.add(this.seedScene);
    this.start();
  }

  componentWillUnmount() {
    console.log('Unmouting');
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  animate = (timestamp) => {
    this.renderer.render(this.scene, this.camera);
    this.seedScene.update && this.seedScene.update(timestamp);
    this.frameId = window.requestAnimationFrame(this.animate);
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = window.requestAnimationFrame(this.animate);
    }
  };

  stop = () => {
    window.cancelAnimationFrame(this.frameId);
  }

  windowResizeHandler = async () => {
    this.renderer.setSize(this.mount.clientWidth, this.mount.clientHeight);
    this.camera.aspect = this.mount.clientWidth / this.mount.clientHeight;
    this.camera.updateProjectionMatrix();
  }

  render() {

    return (
      <StyledRow type="flex" justify="center" align="middle">
        <Fade delay={1500}>
          <Container
            ref={(mount) => {
              this.mount = mount;
            }}
          />
        </Fade>
      </StyledRow>
    );
  }
}

export default Contact;
