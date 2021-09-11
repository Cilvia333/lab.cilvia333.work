import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Object3D,
  Fog,
  DirectionalLight,
  AmbientLight,
  SphereBufferGeometry,
  MeshPhongMaterial,
  Mesh,
} from 'three';
import styled from 'styled-components';
import tw from 'twin.macro';

import Layout from '~/components/layout';

const IndexPage = () => {
  const EffectComposer = (
    await import(`three/examples/jsm/postprocessing/EffectComposer`)
  ).EffectComposer;
  const RenderPass = (
    await import(`three/examples/jsm/postprocessing/RenderPass`)
  ).RenderPass;
  const GlitchPass = (
    await import(`three/examples/jsm/postprocessing/GlitchPass`)
  ).GlitchPass;

  interface ParamsAnimate {
    object: THREE.Object3D;
    composer: typeof EffectComposer;
  }

  const onCanvasLoaded = (canvas: HTMLCanvasElement) => {
    if (!canvas) {
      return;
    }

    const width = window.innerWidth;
    const height = window.innerHeight;

    // init scene
    const scene = new Scene();
    const camera = new PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000,
    );
    camera.position.z = 240;

    // init renderer
    const renderer = new WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setClearColor(`#1d1d1d`);
    renderer.setSize(width, height);

    // init object
    const object = new Object3D();
    scene.add(object);

    // add fog
    scene.fog = new Fog(0xffffff, 1, 1000);

    // add light
    const spotLight = new DirectionalLight(0xffffff);
    spotLight.position.set(1, 1, 1);
    scene.add(spotLight);
    const ambientLight = new AmbientLight(0x222222);
    scene.add(ambientLight);

    // add object
    const geometry = new SphereBufferGeometry(2, 3, 4);
    for (let i = 0; i < 100; i++) {
      const material = new MeshPhongMaterial({
        color: 0x000000,
        flatShading: true,
      });
      const mesh = new Mesh(geometry, material);
      mesh.position
        .set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.1)
        .normalize();
      mesh.position.multiplyScalar(Math.random() * 400);
      mesh.rotation.set(
        Math.random() * 2,
        Math.random() * 2,
        Math.random() * 2,
      );
      mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 50;
      object.add(mesh);
    }

    // add postprocessing
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const effectGlitch = new GlitchPass(64);
    // true => exstreme
    effectGlitch.goWild = false;
    effectGlitch.renderToScreen = true;
    composer.addPass(effectGlitch);

    // resize
    window.addEventListener(`resize`, () => handleResize({ camera, renderer }));

    animate({ object, composer });
  };

  // handle resize
  const handleResize = ({ camera, renderer }) => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / width;
    camera.updateProjectionMatrix();
    renderer.setSize(width, width);
  };

  useEffect(() => {
    return () => window.removeEventListener(`resize`, () => handleResize);
  });
  // animation
  const animate = ({ object, composer }: ParamsAnimate) => {
    window.requestAnimationFrame(() => animate({ object, composer }));
    object.rotation.x += 0.01;
    object.rotation.z += 0.01;
    composer.render();
  };

  return (
    <Layout title="test">
      <h1>Hello Next.js 👋</h1>
      <StyledCanvas ref={onCanvasLoaded} />
    </Layout>
  );
};

const StyledCanvas = styled.canvas`
  ${tw`relative w-full`}
`;

export default IndexPage;
