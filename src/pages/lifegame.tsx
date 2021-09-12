import React, { useEffect } from 'react';
import { NextPage } from 'next';
import * as THREE from 'three';
import { css } from '@emotion/react';
import tw from 'twin.macro';
//import { GPUComputationRenderer } from 'gpucomputationrender-three';

import Layout from '~/components/layout';

import GPUComputationRenderer from '~/vendor/GPUComputationRenderer';

import materialVert from '~/shaders/lifegame/material.vert';
import materialFrag from '~/shaders/lifegame/material.frag';
import lifegameFrag from '~/shaders/lifegame/lifegame.frag';

const MainCanvasStyle = css`
  ${tw`relative w-full`}
`;

const LifeGamePage: NextPage = () => {
  const onCanvasLoaded = (canvas: HTMLCanvasElement) => {
    if (!canvas) {
      return;
    }

    const width = window.innerWidth;
    const height = window.innerHeight;

    const planeWidth = 640;
    const planeHeight = 480;

    let textureWidth = 0;
    for (let i = 1, l = planeWidth * planeHeight; ; i++) {
      const w = Math.pow(2.0, i);
      if (w * w > l) {
        textureWidth = w;
        break;
      }
    }

    // init scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.z = 1000;

    const plane = new THREE.PlaneBufferGeometry(planeWidth, planeHeight);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        textureLifeGame: { value: null },
        planeSize: { value: new THREE.Vector2(planeWidth, planeHeight) },
        textureSize: { value: new THREE.Vector2(textureWidth, textureWidth) },
      },
      vertexShader: materialVert,
      fragmentShader: materialFrag,
      side: THREE.DoubleSide,
    });
    scene.add(new THREE.Mesh(plane, material));

    const renderer = new THREE.WebGL1Renderer({
      canvas: canvas,
      antialias: true,
    });
    //renderer.setClearColor(`#1d1d1d`);
    renderer.setSize(width, height);
    //document.body.appendChild(renderer.domElement);

    const gpuCompute = new GPUComputationRenderer(
      textureWidth,
      textureWidth,
      renderer,
    );
    const textureLifeGame = gpuCompute.createTexture();
    for (let i = 0, l = textureLifeGame.image.data.length; i < l; i += 4) {
      textureLifeGame.image.data[i + 0] = Math.random() < 0.2 ? 1.0 : 0.0;
      textureLifeGame.image.data[i + 1] = 0.0;
      textureLifeGame.image.data[i + 2] = 0.0;
      textureLifeGame.image.data[i + 3] = 0.0;
    }

    const variableLifeGame = gpuCompute.addVariable(
      `textureLifeGame`,
      lifegameFrag,
      textureLifeGame,
    );

    gpuCompute.setVariableDependencies(variableLifeGame, [variableLifeGame]);
    variableLifeGame.material.uniforms.planeSize = {
      value: new THREE.Vector2(planeWidth, planeHeight),
    };

    const error = gpuCompute.init();
    if (error !== null) {
      console.error(error);
    }

    const animate = () => {
      requestAnimationFrame(animate);
      //controls.update();
      gpuCompute.compute();
      material.uniforms.textureLifeGame.value = gpuCompute.getCurrentRenderTarget(
        variableLifeGame,
      ).texture;

      renderer.render(scene, camera);
    };

    animate();
  };

  return (
    <Layout title="test">
      <canvas css={MainCanvasStyle} ref={onCanvasLoaded} />
    </Layout>
  );
};

export default LifeGamePage;
