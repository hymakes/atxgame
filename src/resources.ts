import { ImageFiltering, ImageSource, Loader } from "excalibur";

import heroPath from './assets/maps/conjurer.png?url'
import personPath from './assets/maps/person.png?url'
import tmxPath from './assets/maps/grass_level.tmx?url';
import tmxPath2 from './assets/maps/snow_level.tmx?url';
import tilesetPath from './assets/maps/tiles.png?url';
import tsxPath from './assets/maps/atx_tiles.tsx?url';
import tacoPngPath from '../public/images/taco.png?url';
import { TiledResource } from "@excaliburjs/plugin-tiled";
import { Player } from "./player";
import { Taco } from "./taco";
import { ScenePortal } from "./scene-portal";
import { Person } from "./person";

// It is convenient to put your resources in one place
export const Resources = {
  TacoPng: new ImageSource(tacoPngPath),
  HeroSpriteSheetPng: new ImageSource(heroPath, false, ImageFiltering.Pixel),
  PersonSpriteSheetPng: new ImageSource(personPath, false, ImageFiltering.Pixel),
  Level1: new TiledResource(tmxPath, {
    entityClassNameFactories: {
      player: (props) => {
        const player = new Player(props.worldPos);
        return player;
      },
      person: (props) => {
        const person = new Person(props.worldPos);
        return person;
      },
      taco: (props) => {
        const taco = new Taco(props.worldPos);
        return taco;
      },
      exit: (props) => {
        console.log("map props", props.object?.properties.get('scenedestination'))
        const exitPortal = new ScenePortal(props.worldPos, String(props.object?.properties.get('scenedestination') ?? 'none'));
        return exitPortal;
      }
    },
    pathMap: [
      { path: 'grass_level.tmx', output: tmxPath },
      { path: 'tiles.png', output: tilesetPath },
      { path: 'atx_tiles.tsx', output: tsxPath }
    ]
  }),
  Level2: new TiledResource(tmxPath2, {
    entityClassNameFactories: {
      player: (props) => {
        const player = new Player(props.worldPos);
        return player;
      },
      taco: (props) => {
        const taco = new Taco(props.worldPos);
        return taco;
      },
      exit: (props) => {
        console.log("map props", props.object?.properties.get('scenedestination'))
        const exitPortal = new ScenePortal(props.worldPos, String(props.object?.properties.get('scenedestination') ?? 'none'));
        return exitPortal;
      }
    },
    pathMap: [
      { path: 'snow_level.tmx', output: tmxPath2 },
      { path: 'tiles.png', output: tilesetPath },
      { path: 'atx_tiles.tsx', output: tsxPath }
    ]
  })
} as const; // the 'as const' is a neat typescript trick to get strong typing on your resources.
// So when you type Resources.Sword -> ImageSource

// We build a loader and add all of our resources to the boot loader
// You can build your own loader by extending DefaultLoader
export const loader = new Loader();
for (const res of Object.values(Resources)) {
  loader.addResource(res);
}
