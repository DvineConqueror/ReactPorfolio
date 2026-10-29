import type { CSSProperties } from "react";
import { snowflakes, type Season } from "../domain/season";

export function SeasonGlyph({ season }: { season: Season }) {
  return <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false" className="season-glyph" shapeRendering="crispEdges">
    {season === "halloween" ? <><path fill="#50773b" d="M15 2h5v4h-3v5h-4V6h2z" /><path fill="currentColor" d="M8 9h16v3h4v13h-4v4H8v-4H4V12h4z" /><path fill="var(--bg)" d="M9 14h5v5H9zm10 0h5v5h-5zm-9 8h4v2h4v-2h5v3h-4v2h-5v-2h-4z" /></> : season === "christmas" ? <><path fill="currentColor" d="M14 2h4v4h3v4h3v5h-4l7 9H5l7-9H8v-5h3V6h3z" /><path fill="#ba8337" d="M14 24h4v6h-4z" /><path fill="var(--bg)" d="M14 9h4v3h-4zm-5 8h3v3H9zm11 3h3v3h-3z" /></> : <path fill="currentColor" d="M14 3h4v7h4v4h7v4h-7v4h-4v7h-4v-7h-4v-4H3v-4h7v-4h4zm0 11v4h4v-4z" />}
  </svg>;
}

function Pumpkin({ x, y, size = 1 }: { x: number; y: number; size?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${size})`}>
    <path fill="#547847" d="M22 0h7v5h-3v7h-5V5h1z" />
    <path fill="#a84e25" d="M9 10h30v5h7v25h-7v6H9v-6H2V15h7z" />
    <path fill="#dd7935" d="M13 10h22v5h6v25h-8v5H15v-5H7V15h6z" />
    <path fill="#ed9a48" d="M19 12h10v28H19z" />
    <path fill="#43282d" d="M10 22h4v-4h5v10h-9zm19-4h5v4h4v6h-9zM11 33h7v4h12v-4h8v7h-8v3H18v-3h-7z" />
    <path className="season-animate lantern-light" fill="#ffe5a0" d="M12 23h5v4h-5zm19 0h5v4h-5zM14 35h3v4h15v-4h3v5H14z" />
  </g>;
}

function HalloweenScene() {
  return <svg className="season-art" viewBox="0 0 900 112" aria-hidden="true" focusable="false" shapeRendering="crispEdges">
    <path fill="var(--season-ground)" d="M0 107h900v5H0zM70 102h36v5H70zm214-3h24v8h-24zm152 4h25v4h-25zm99-4h34v8h-34zm235 3h108v5H770z" />
    <path fill="var(--season-line)" d="M115 75h5v32h-5zm-9 14h22v4h-22zm51-21h5v39h-5zm-10 14h25v4h-25zm-31-4h45v4h-45zm3 16h39v4h-39z" />
    <path fill="var(--season-shadow)" d="M325 61h22v5h5v41h-32V66h5z" />
    <path fill="var(--season-line)" d="M333 70h5v8h6v4h-6v13h-5V82h-6v-4h6z" />
    <g transform="translate(516 39)"><path fill="var(--season-ghost)" d="M10 0h20v5h7v10h5v30h-8v-6h-7v6h-8v-6h-7v6H4V15h6z" /><path fill="var(--season-shadow)" d="M15 14h5v8h-5zm12 0h5v8h-5zm-7 17h8v4h-8z" /></g>
    <g transform="translate(636 5)">
      <path fill="#956b41" d="M43 56h6v46h-6zM5 50h79v6H5z" />
      <path fill="#b88342" d="M30 6h27v17H30zM18 23h51v7H18z" />
      <path fill="#59413e" d="M34 0h18v7H34zM27 16h35v7H27z" />
      <path fill="#d8b26a" d="M30 30h28v24H30zM24 33h6v14h-6zm34 2h6v14h-6z" />
      <path fill="#43282d" d="M35 35h4v5h-4zm14 0h4v5h-4zM35 45h4v3h13v-3h4v7H35z" />
      <path fill="#c86e32" d="M43 39h5v7h-5z" />
      <path fill="var(--season-cloth)" d="M24 54h40v9h14v12H58v24H29V75H11V63h13z" />
      <path fill="#c49a53" d="M9 68h12v5H9zm57 0h14v5H66zM29 98h12v6H29zm17 0h12v6H46z" />
      <path fill="#d6b895" d="M39 59h3v5h-3zm8 10h3v4h-3zm-12 8h3v4h-3zm17 8h3v4h-3z" />
      <path fill="#9f5330" d="M39 53h17v8H39z" />
    </g>
    <Pumpkin x={749} y={67} size={.82} /><Pumpkin x={796} y={45} size={1.3} /><Pumpkin x={858} y={73} size={.7} />
    <g stroke="var(--season-line)" fill="none" strokeWidth="1.5"><path d="M890 0v55M823 0h77v61M843 0v11h15v13h14v13h14v14h14M858 0v10h13v13h14v14h15M875 0v12h12v12h13" /><path d="m825 0 75 59m-52-59 52 40m-25-40 25 21" /></g>
    <g className="season-animate seasonal-spider" fill="var(--season-shadow)"><path d="M886 51h8v12h-8zm-6-4h3v8h-3zm17 0h3v8h-3zm-20 12h3v8h-3zm23 0h3v8h-3z" /></g>
  </svg>;
}

function Pine({ x, y, size = 1 }: { x: number; y: number; size?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${size})`}><path fill="#936744" d="M23 44h8v14h-8z" /><path fill="var(--season-evergreen)" d="M23 0h8v7h7v7h6v7H35l16 22H39l15 9H0l15-9H4l16-22h-9v-7h6V7h6z" /><path fill="var(--season-snowcap)" d="M23 0h8v7h7v5H17V7h6zM12 27h5v5h20v-5h5v10H12zM5 46h44v6H5z" /></g>;
}

function Mistletoe() {
  return <svg className="christmas-mistletoe" viewBox="0 0 80 100" focusable="false" shapeRendering="crispEdges"><path stroke="var(--season-evergreen)" fill="none" strokeWidth="3" d="M40 0v34L20 70m20-36 20 36" /><path fill="var(--season-evergreen)" d="M13 31h12v7h9v16H22v-8h-9zm42 0h12v15H55v8H44V38h11zM8 60h14v7h8v14H17v-8H8zm49 0h15v13h-9v8H50V67h7z" /><path fill="#f2e9cc" d="M31 52h7v7h-7zm11 3h7v7h-7zm-7 9h7v7h-7z" /><path fill="#bb554e" d="M26 22h12v6H26zm16 0h12v6H42zM36 24h8v9h-8z" /></svg>;
}

function ChristmasCharacters() {
  return <g className="christmas-characters">
    <g className="christmas-snowman" transform="translate(430 43)"><path stroke="#947453" strokeWidth="3" d="m10 42-13-12m43 12 13-12" /><path fill="#e4efed" d="M9 28h27v5h6v24h-6v7H9v-7H3V33h6zM12 9h21v5h5v17h-5v5H12v-5H7V14h5z" /><path fill="#283b40" d="M11 0h23v12H11zM5 10h36v5H5zM16 19h3v3h-3zm12 0h3v3h-3zM21 42h4v4h-4zm0 10h4v4h-4z" /><path fill="#d39145" d="M23 24h15v4H23z" /><path fill="#b6514e" d="M9 31h29v6H9zm21 5h7v13h-7z" /></g>
    <g className="christmas-reindeer" transform="translate(491 43)"><path fill="#98734b" d="M5 34h38v19H5zm29-23h17v30H34zm13 4h13v12H47zM8 50h5v14H8zm24 0h5v14h-5z" /><path stroke="#75583f" strokeWidth="3" fill="none" d="M38 14V0m0 8-9-5m9 0 7-5m0 18 8-8V0m0 7 7-3" /><path fill="#d3b27a" d="M9 36h21v4H9zM43 26h8v11h-8z" /><path fill="#1c302c" d="M48 15h3v3h-3zM5 61h10v4H5zm25 0h9v4h-9z" /><path fill="#bc554f" d="M57 19h6v6h-6zM35 35h16v5H35z" /><path fill="#e5bf67" d="M42 40h5v5h-5z" /></g>
    <g className="christmas-santa" transform="translate(664 39)"><path fill="#b94f4c" d="M8 29h29v6h6v22H3V35h5zM12 5h22v13H8V9h4zM28 0h9v7h-9z" /><path fill="#edcea7" d="M12 17h23v18H12zM0 40h6v8H0zm40 0h6v8h-6z" /><path fill="#f2eee1" d="M7 14h32v6H7zM33 3h7v7h-7zM9 28h7v6h14v-6h8v12h-7v4H17v-4H9zM3 54h40v6H3z" /><path fill="#233631" d="M5 47h36v5H5zM9 60h10v8H6v-5h3zm18 0h10v3h3v5H27zM16 23h3v3h-3zm12 0h3v3h-3z" /><path fill="#e9bd60" d="M19 46h9v7h-9z" /><path fill="#f2eee1" d="M22 48h3v3h-3z" /></g>
    {[{x:838,y:60},{x:871,y:64}].map(({x,y},i) => <g key={x} className="christmas-elf" transform={`translate(${x} ${y}) scale(${i ? .88 : 1})`}><path fill="#4d8161" d="M7 4h14v14H3V9h4zM5 28h20v20H5z" /><path fill="#e4c498" d="M6 18h18v13H6zM1 20h5v5H1zm23 0h5v5h-5z" /><path fill="#b9554e" d="M3 15h23v5H3zm13-14h7v6h-7zM5 33h20v4H5zM7 46h6v7H3v-4h4zm11 0h6v3h4v4H18z" /><path fill="#22382e" d="M10 22h2v3h-2zm9 0h2v3h-2z" /><path fill="#ebcb78" d="M11 33h7v5h-7z" /></g>)}
  </g>;
}

function ChristmasAurora() {
  return <div className="season-aurora season-animate" aria-hidden="true"><svg viewBox="0 0 1440 600" preserveAspectRatio="none" focusable="false"><defs><linearGradient id="aurora-green" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#6b63da" stopOpacity="0" /><stop offset=".55" stopColor="#76d9cb" stopOpacity=".25" /><stop offset=".86" stopColor="#67e6a1" stopOpacity=".9" /><stop offset="1" stopColor="#67e6a1" stopOpacity="0" /></linearGradient><linearGradient id="aurora-violet" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#9b7be6" stopOpacity="0" /><stop offset=".8" stopColor="#8a7fe3" stopOpacity=".7" /><stop offset="1" stopColor="#71b6d6" stopOpacity="0" /></linearGradient></defs><path fill="url(#aurora-violet)" d="M-100 0H1540V320C1260 460 1130 160 900 270S510 530 250 300-50 400-100 350Z" /><path fill="url(#aurora-green)" d="M-100 0H1540V260C1260 420 1150 150 930 300S530 480 300 270 40 410-100 300Z" /><path fill="url(#aurora-green)" opacity=".5" d="M-100 0H1540V430C1200 300 1100 510 830 360S460 210 190 410-20 500-100 430Z" /></svg></div>;
}

function ChristmasScene() {
  return <svg className="season-art christmas-art" viewBox="0 0 900 112" aria-hidden="true" focusable="false" shapeRendering="crispEdges">
    <path fill="var(--season-ground)" d="M0 106h900v6H0zM90 102h62v4H90zm244 0h56v4h-56zm203-3h80v7h-80zm92 0h240v7H629z" />
    <Pine x={95} y={60} size={.8} /><Pine x={270} y={43} />
    <g transform="translate(567 40)">
      <path fill="#977250" d="M8 24h78v40H8z" /><path fill="#74513e" d="M4 23v-8h12V7h16V0h30v7h16v8h12v8z" />
      <path fill="var(--season-snowcap)" d="M4 15h12V7h16V0h30v7h16v8h12v8H75v-6H60v-6H34v6H19v6H4z" />
      <path fill="#b89669" d="M8 35h78v4H8zm0 13h78v4H8z" /><path fill="#533e35" d="M40 36h17v28H40z" />
      <path className="season-animate christmas-light" fill="#f7cb71" d="M16 30h16v15H16zm47 0h16v15H63z" />
      <path fill="#977250" d="M21 28h4v19h-4zm-7 8h20v4H14zm56-8h4v19h-4zm-9 8h20v4H61z" />
      <path fill="var(--season-evergreen)" d="M39 23h20v4H39zM35 27h8v11h-8zm20 0h8v11h-8zm-16 9h20v4H39z" /><path fill="#b75551" d="M45 25h8v7h-8z" />
    </g>
    <Pine x={706} y={19} size={1.5} />
    <path fill="#deb95a" d="M742 9h6v5h6v6h-6v6h-6v-6h-6v-6h6z" />
    <path className="season-animate christmas-light" fill="#eec66b" d="M740 47h5v5h-5zm18 17h5v5h-5zm-25 13h5v5h-5zm21 17h5v5h-5z" />
    <g className="christmas-gifts" transform="translate(772 78)"><path fill="#b45f56" d="M0 0h30v29H0z" /><path fill="#eccb7b" d="M12 0h6v29h-6zM0 8h30v5H0z" /><path fill="var(--season-evergreen)" d="M36 9h26v20H36z" /><path fill="#dcb76a" d="M47 9h5v20h-5zM36 16h26v5H36z" /></g>
    <g className="season-mistletoe"><path stroke="var(--season-line)" strokeWidth="2" d="M872 0v22l-12 21m12-21 13 21" /><path fill="var(--season-evergreen)" d="M855 21h9v6h5v10h-8v-5h-6zm25 0h9v11h-5v6h-8V27h4zM850 39h10v6h6v7h-10v-5h-6zm34 0h10v8h-6v5h-10v-7h6z" /><path fill="#c46458" d="M865 34h7v7h-7zm9 4h7v7h-7zm-4 7h7v7h-7z" /></g>
    <ChristmasCharacters />
  </svg>;
}

function Web() {
  return <svg viewBox="0 0 160 160" focusable="false" aria-hidden="true" className="season-web"><g fill="none" stroke="currentColor" strokeWidth="1"><path d="M0 0h160M0 0v160M0 0l150 150M0 0l62 150M0 0l150 62M0 0l112 160M0 0l160 112" />{[.22,.42,.64,.86,1].map(s => <path key={s} transform={`scale(${s})`} d="M0 150Q34 115 62 150Q66 120 112 160Q110 124 150 150Q124 110 160 112Q120 66 150 62Q115 34 150 0" />)}</g></svg>;
}

function EdgeSpider({ side }: { side: "left" | "right" }) {
  return <div className={`season-edge-spider season-animate season-edge-spider-${side}`}><span className="spider-silk" /><svg viewBox="0 0 40 40" focusable="false"><g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="m17 18-7-5-5-7m12 15-10-2-5-6m15 11-10 3-4 7m14-7-6 7v5m12-21 7-5 5-7m-12 15 10-2 5-6m-15 11 10 3 4 7m-14-7 6 7v5" /></g><ellipse cx="20" cy="25" rx="6" ry="8" fill="currentColor" /><circle cx="20" cy="16" r="4" fill="currentColor" /><path d="M17 16h2v2h-2m4-2h2v2h-2" fill="#d78d49" /></svg></div>;
}

function HalloweenWeather() {
  return <><div className="season-web-corner season-web-left"><Web /></div><div className="season-web-corner"><Web /></div><div className="season-web-corner season-web-bottom"><Web /></div><EdgeSpider side="left" /><EdgeSpider side="right" /><div className="season-lightning season-animate"><svg className="season-lightning-streak" viewBox="0 0 220 600" focusable="false"><path d="M145 0 80 118l51-18-82 147 61-21-75 150 45-18L5 580M85 192l80 57-28-3 67 76" /></svg><svg className="season-lightning-streak season-lightning-far" viewBox="0 0 220 600" focusable="false"><path d="m130 0-58 140 48-20-65 125 30-7-60 180m55-190 77 60-25-5 60 65" /></svg></div></>;
}

export function PortraitSeasonDecoration({ season }: { season: Season }) {
  if (season === "off") return null;
  return <svg className={`portrait-seasonal portrait-seasonal-${season}`} viewBox="0 0 160 200" aria-hidden="true" focusable="false" shapeRendering="crispEdges">
    {season === "halloween" ? <>
      <rect x="5" y="5" width="150" height="190" rx="7" fill="#b76730" opacity=".12" />
      <path fill="#715085" opacity=".13" d="M5 5h150v42H5zM5 47h22v148H5z" />
      <g className="portrait-web" stroke="var(--season-portrait-web)" fill="none" strokeWidth="1.2">
        <path d="M4 4h54M4 4v54M4 4l46 46M4 19h12v11h12v11h12v12M4 33h11v10h11v11M19 4v12h11v12h11v12h12M33 4v11h10v11h11M156 4h-54m54 0v54m0-54-46 46m46-31h-12v11h-12v11h-12v12m36-20h-11v10h-11v11m7-50v12h-11v12h-11v12h-12m26-36v11h-10v11h-11M145 38v31" />
      </g>
      <path fill="#4c2d50" d="M142 67h7v10h-7zm-4-3h3v7h-3zm12 0h3v7h-3zm-14 10h3v7h-3zm17 0h3v7h-3z" />
      <path fill="#efad63" d="M144 69h2v3h-2z" />
      <g transform="translate(5 174) scale(.4)"><path fill="#67824a" d="M22 0h5v11h-5z" /><path fill="#db7c36" d="M8 10h30v6h7v24h-7v6H8v-6H1V16h7z" /><path fill="#48283d" d="M10 20h8v8h-8zm19 0h8v8h-8zM12 34h24v6H12z" /></g>
    </> : <>
      <rect x="5" y="5" width="150" height="190" rx="7" fill="#bfdcce" opacity=".08" />
      <path fill="#f1f7ee" d="M5 5h150v7h-11v5h-13v-4h-18v5h-14v-5H77v4H61v-4H42v6H29v-6H14v5H5zM5 190h20v5H5zm127-2h23v7h-23z" />
      <path stroke="#4c745b" strokeWidth="2" fill="none" d="M9 22h142M18 22v6m23-6v6m24-6v6m26-6v6m24-6v6m24-6v6" />
      <path fill="#c96c61" d="M15 27h6v8h-6zm73 0h6v8h-6z" /><path fill="#e3bd6b" d="M38 27h6v8h-6zm74 0h6v8h-6z" /><path fill="#89b295" d="M62 27h6v8h-6zm74 0h6v8h-6z" />
      <path fill="#467455" d="M7 163h9v6h6v6h-9v-5H7zm19 0h8v7h-5v5h-9v-6h6z" /><path fill="#bc514c" d="M16 174h6v6h-6zm8 3h6v6h-6z" />
    </>}
  </svg>;
}

export function SeasonalScene({ season }: { season: Season }) {
  if (season === "off") return null;
  return <div className="season-stage" aria-hidden="true"><div className="season-scene-layer" data-active={season === "halloween"}><HalloweenScene /></div><div className="season-scene-layer" data-active={season === "christmas"}><ChristmasScene /></div></div>;
}

export function SeasonalAtmosphere({ season }: { season: Season }) {
  if (season === "off") return null;
  return <>
    {season === "christmas" && <ChristmasAurora />}
    <div className="season-weather" data-weather={season} aria-hidden="true">
      {season === "halloween" ? <HalloweenWeather /> : snowflakes.map((flake, i) => <span key={i} className="season-snowflake season-animate" style={{ "--snow-x": `${flake.x}%`, "--snow-drift": `${flake.drift}px`, "--snow-size": `${flake.size}px`, "--snow-duration": `${flake.duration}s`, "--snow-delay": `${flake.delay}s` } as CSSProperties} />)}
    </div>
    {season === "christmas" && <div className="season-chrome-lights" aria-hidden="true">{Array.from({ length: 24 }, (_, i) => <span className="season-animate christmas-light" key={i} style={{ "--light-delay": `${-(i % 4)}s` } as CSSProperties} />)}</div>}
    {season === "christmas" && <div className="christmas-top-greenery" aria-hidden="true"><Mistletoe /><Mistletoe /></div>}
  </>;
}
