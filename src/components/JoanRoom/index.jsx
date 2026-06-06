/*
 * 3D Room ported from joan-portfolio by Joan Ramos Refusta.
 * Original: https://github.com/jrefusta/joan-portfolio
 * Licensed under MIT License. See /third-party/joan-portfolio-MIT-LICENSE.txt.
 */
"use client";

import { useEffect, useRef, useState } from "react";
import Experience from "./Experience/Experience.js";

const isMobileViewport = () =>
  /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) ||
  Boolean(navigator.userAgentData?.mobile) ||
  window.innerWidth <= 768;

export default function JoanRoom() {
  const webglRef = useRef(null);
  const cssArcadeRef = useRef(null);
  const cssLeftRef = useRef(null);
  const cssRightRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = isMobileViewport();
    setIsMobile(mobile);
    if (mobile) return undefined;

    Experience.instance = null;
    const webglElement = webglRef.current;
    const cssArcadeElement = cssArcadeRef.current;
    const cssLeftElement = cssLeftRef.current;
    const cssRightElement = cssRightRef.current;

    const experience = new Experience({
      webglElement,
      cssArcadeMachine: cssArcadeElement,
      cssLeftMonitor: cssLeftElement,
      cssRightMonitor: cssRightElement,
    });

    return () => {
      try {
        experience?.renderer?.destroy?.();
      } catch {
        // The source renderer owns several targets; cleanup should never break route changes.
      }

      webglElement?.replaceChildren();
      cssArcadeElement?.replaceChildren();
      cssLeftElement?.replaceChildren();
      cssRightElement?.replaceChildren();
      Experience.instance = null;
    };
  }, []);

  return (
    <div className="joan-room-shell">
      <div className="mobile-text">
        <p className="mobile-sad">:(</p>
        <p>
          This 3D room is best on a desktop or laptop. Please open the portfolio
          on a larger screen for the full interactive experience.
        </p>
      </div>
      {!isMobile && (
        <>
          <div className="loadingScreen">
            ABHIJEET <br /> RANJAN
          </div>
          <div className="banner">
            <span className="banner-link" id="leftMonitor">
              ABOUT ME
            </span>
            <span className="banner-link" id="rightMonitor">
              PROJECTS
            </span>
            <span className="banner-link" id="arcadeMachine">
              ARCADE MACHINE
            </span>
            <span className="banner-link" id="whiteboard">
              WHITEBOARD
            </span>
            <span className="banner-link" id="rubikGroup">
              RUBIK&apos;S CUBE
            </span>
          </div>
          <div className="audio-button" aria-label="Toggle audio" />
          <button className="circular-button" id="back-button" aria-label="Back" />
          <div className="button-row" id="whiteboard-buttons">
            <button
              className="circular-button-whiteboard whiteboard-selected"
              id="black-marker"
              aria-label="Black marker"
              style={{ backgroundImage: "url('/assets/svg/black-marker.svg')" }}
            />
            <button
              className="circular-button-whiteboard"
              id="red-marker"
              aria-label="Red marker"
              style={{ backgroundImage: "url('/assets/svg/red-marker.svg')" }}
            />
            <button
              className="circular-button-whiteboard"
              id="green-marker"
              aria-label="Green marker"
              style={{ backgroundImage: "url('/assets/svg/green-marker.svg')" }}
            />
            <button
              className="circular-button-whiteboard"
              id="blue-marker"
              aria-label="Blue marker"
              style={{ backgroundImage: "url('/assets/svg/blue-marker.svg')" }}
            />
            <button
              className="circular-button-whiteboard"
              id="eraser"
              aria-label="Eraser"
              style={{ backgroundImage: "url('/assets/svg/eraser.svg')" }}
            />
          </div>
          <div className="rubik-message">
            Click and drag anywhere on the cube to rotate it in that direction.
          </div>
          <div id="cssArcadeMachine" ref={cssArcadeRef} />
          <div id="cssLeftMonitor" ref={cssLeftRef} />
          <div id="cssRightMonitor" ref={cssRightRef} />
          <div id="webgl" ref={webglRef} />
          <canvas id="drawing-canvas" width="2048" height="1024" />
        </>
      )}
      <style jsx global>{`
        @font-face {
          font-family: "Saeada";
          src: url("/assets/fonts/LTSaeada-Black.otf") format("opentype");
          font-display: swap;
        }

        .joan-room-shell,
        .joan-room-shell * {
          box-sizing: border-box;
          font-family: Saeada, sans-serif;
          letter-spacing: 0;
        }

        .joan-room-shell {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 720px;
          overflow: hidden;
          background-color: #072446;
          color: #eda72d;
        }

        .joan-room-shell #webgl {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: auto;
        }

        .joan-room-shell #cssArcadeMachine,
        .joan-room-shell #cssLeftMonitor,
        .joan-room-shell #cssRightMonitor {
          position: absolute;
          inset: 0;
          pointer-events: none;
          cursor: pointer;
        }

        .joan-room-shell #drawing-canvas {
          display: none;
          background-color: #ffffff;
        }

        .joan-room-shell .banner {
          position: absolute;
          top: -90px;
          left: 0;
          z-index: 4;
          display: flex;
          width: 100%;
          height: 60px;
          flex-direction: row;
          align-items: center;
          justify-content: space-around;
          padding: 10px 0;
          background-color: #0a3362;
          color: #eda72d;
          text-align: center;
          font-size: clamp(12px, 1.3vw, 22px);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);
          transition: top 0.5s ease-in-out;
        }

        .joan-room-shell .banner-link {
          margin: 0 1vw;
          cursor: pointer;
          user-select: none;
          transition: transform 0.2s ease-in-out;
        }

        .joan-room-shell .banner-link:hover {
          transform: scale(1.08);
        }

        .joan-room-shell .circular-button {
          position: absolute;
          bottom: 50px;
          left: 50px;
          z-index: 5;
          display: block;
          width: 100px;
          height: 100px;
          visibility: hidden;
          border: 0;
          border-radius: 50%;
          background-color: #0a3362;
          background-image: url("/assets/svg/arrow-back.svg");
          background-position: center;
          background-repeat: no-repeat;
          background-size: 70%;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);
          cursor: pointer;
          opacity: 0;
          transition: opacity 1s, visibility 1s, background-size 0.2s ease-in-out;
        }

        .joan-room-shell .show-back-button {
          visibility: visible;
          opacity: 1;
        }

        .joan-room-shell .circular-button:hover {
          background-size: 75%;
        }

        .joan-room-shell .button-row {
          position: absolute;
          bottom: 100px;
          z-index: 4;
          display: flex;
          width: 100%;
          justify-content: center;
          visibility: hidden;
          opacity: 0;
          transition: opacity 1s, visibility 1s;
        }

        .joan-room-shell .show-button-row {
          visibility: visible;
          opacity: 1;
        }

        .joan-room-shell .circular-button-whiteboard {
          display: inline-block;
          width: 100px;
          height: 100px;
          margin: 0 20px;
          border: 5px solid transparent;
          border-radius: 50%;
          background-color: #0a3362;
          background-position: center;
          background-repeat: no-repeat;
          background-size: 70%;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);
          cursor: pointer;
          transition: all 0.5s ease;
        }

        .joan-room-shell .whiteboard-selected {
          border-color: #eda72d;
        }

        .joan-room-shell .circular-button-whiteboard:hover {
          background-size: 80%;
        }

        .joan-room-shell .rubik-message {
          position: absolute;
          bottom: 20px;
          left: 50%;
          z-index: 4;
          width: min(720px, calc(100% - 32px));
          transform: translateX(-50%);
          color: #eda72d;
          font-size: clamp(14px, 1.5rem, 24px);
          text-align: center;
          user-select: none;
          visibility: hidden;
          opacity: 0;
          transition: opacity 1s ease, visibility 1s ease;
        }

        .joan-room-shell .show-rubik-message {
          visibility: visible;
          opacity: 1;
        }

        .joan-room-shell .audio-button {
          position: absolute;
          right: 50px;
          bottom: 50px;
          z-index: 5;
          display: block;
          width: 50px;
          height: 50px;
          visibility: hidden;
          border-radius: 50%;
          background-color: #0a3362;
          background-image: url("/assets/svg/audio-volume-high.svg");
          background-position: center;
          background-repeat: no-repeat;
          background-size: 50%;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);
          cursor: pointer;
          opacity: 0;
          transition: opacity 1s, visibility 1s, background-size 0.2s ease-in-out;
        }

        .joan-room-shell .audio-button:hover {
          opacity: 1;
        }

        .joan-room-shell .audio-button-muted {
          background-image: url("/assets/svg/audio-volume-muted.svg");
        }

        .joan-room-shell .show-audio-button {
          visibility: visible;
          opacity: 0.4;
        }

        .joan-room-shell .loadingScreen {
          --mask: linear-gradient(#0a3362, #0a3362) padding-box,
            conic-gradient(#0a3362 var(--p, 0%), transparent 0%) border-box;
          position: absolute;
          top: 50%;
          left: 50%;
          z-index: 4;
          display: flex;
          width: 20vmin;
          min-width: 150px;
          aspect-ratio: 1;
          align-items: center;
          justify-content: center;
          visibility: hidden;
          border: solid 0.5em #eda72d;
          border-radius: 50%;
          background: #0a3362;
          color: #eda72d;
          font-size: clamp(17px, 1.7em, 30px);
          text-align: center;
          user-select: none;
          opacity: 0;
          transform: translate(-50%, -50%);
          -webkit-mask: var(--mask);
          mask: var(--mask);
          box-shadow: 0 2px 1px rgba(0, 0, 0, 1);
          transition: visibility 1s ease, opacity 1s ease, color 1s ease,
            font-size 0.5s ease;
        }

        .joan-room-shell .loading-screen-hover:hover {
          font-size: 2.5em;
        }

        .joan-room-shell .finished-load {
          color: #0a3362 !important;
        }

        .joan-room-shell .show-loading-screen {
          visibility: visible;
          opacity: 1;
        }

        .joan-room-shell .mobile-text {
          display: none;
        }

        @media (max-width: 768px) {
          .joan-room-shell {
            display: grid;
            min-height: 520px;
            place-items: center;
          }

          .joan-room-shell .mobile-text {
            display: block;
            width: min(520px, calc(100% - 36px));
            color: #eda72d;
            text-align: center;
          }

          .joan-room-shell .mobile-sad {
            margin-bottom: 28px;
            font-size: clamp(72px, 24vw, 140px);
            line-height: 0.8;
          }

          .joan-room-shell .mobile-text p:last-child {
            font-size: 16px;
            line-height: 1.5;
          }
        }
      `}</style>
    </div>
  );
}
