import { VideoBackground } from "./videoBackground";
import "./styles/main"

if (!customElements.get('video-background')) {
  customElements.define('video-background', VideoBackground)
}