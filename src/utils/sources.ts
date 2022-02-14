type CompiledSourcesOrFalse = CompiledSources | false

interface CompiledSources {
  sources: SourcesShape, type: SourceType, url: string, breakpoints?:Array<number>
}

function compileSources(srcString:string|null): CompiledSourcesOrFalse   {
    if ( srcString == null) {
      return false;
    }
    let src = srcString.trim()

    let srcsToReturn:SourcesShape = [];
    let srcStrings: string[]= [];
    let sizeStrings = [];
    let hasMultipleSrcs = false,
        hasSizes = false;


    if (src.indexOf(',') >= 0) {
      //Looks like https://something 300w, https://something https://another one, else etc 500w,


      sizeStrings = srcString.split(',');

      if (sizeStrings.length >= 2) {
        sizeStrings.forEach(sizeString => {
          const splitString = sizeString.trim().split(' ');
          if (splitString.length <= 1) {
            srcsToReturn.push(prepareSingleSource(sizeString))
          } else {
            const size = parseInt(splitString[splitString.length -1].replace('w', ''));

            splitString.forEach((string:string)=>{ srcsToReturn.push(prepareSingleSource(string, size))});

          }
        })
      }

      hasSizes = true;
    }
    if (src.indexOf(' ') >= 0) {
      // logger.log('Has multiple sources separated by spaces')

      if (sizeStrings.length >=2)  {

      } else {
        const array = srcString.split(' ');
        array.forEach(item=> { srcStrings.push(item.trim())})

      }
      srcStrings.forEach((string:string)=>{ srcsToReturn.push(prepareSingleSource(string))});

    }

    if (!hasSizes && !hasMultipleSrcs) {
      //Build from single source
      srcsToReturn.push(prepareSingleSource(src))
    }
    return cleanupSources(srcsToReturn);

  }

  /**
   * Removes conflicting sources of different types (can only have one of each type)
   */

function cleanupSources(sources:SourcesShape): CompiledSources {
    //Type first
    let res:CompiledSources = {
      type: sources[0].type,
      url: sources[0].url,
      sources: []
    }
    //Return object if only one.
    if (typeof sources != 'object' || sources.length <= 1) {
      res.sources = sources;
    } else {

      if (res.type  == 'youtube'  || res.type  == 'vimeo' ) {
        res.sources = [sources[0]];
      } else {
        // Get sizes
        let sizes:Array<number> = [];

        sources.forEach((source)=> {
        if (!('maxWidth' in source) || typeof source.maxWidth != 'number') {
          return
        }
        if (!sizes.includes(source.maxWidth)) {
          sizes.push(source.maxWidth);
        }

        res.breakpoints = sizes;
      })
        res.sources = sources.filter(src=>{ return src.type == res.type });
      }
    }
    return res;
  }

  function getSourceType(url:string|null):SourceType {
    if (url == null) {
      return "error";
    }
    const ytTest = new RegExp(/^(?:https?:)?(?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]{7,15})(?:[\?&][a-zA-Z0-9\_-]+=[a-zA-Z0-9\_-]+)*$/);
    const vimeoTest = new RegExp(/\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_]+)/i);
    const videoTest = new RegExp(/.*?\/.*(webm|mp4|ogg|ogm).*?/i);
    if (ytTest.test(url)) {
      return 'youtube'
    } else if (vimeoTest.test(url)) {
      return 'vimeo'
    } else if (videoTest.test(url)) {
      return 'local'
    } else {
      return 'error'
    }
  }

function prepareSingleSource(url:string, size: number|false = false):LocalSource|Source {
    const urlType = getSourceType(url);
    let returner:Source|LocalSource = {
        url: url,
        type: urlType,
    }
    if (urlType == 'local' ) {
      const ft = getFileType(url)
      if (ft) {
        return {...returner, maxWidth: size, fileType: ft}
      }
    }
     return returner;
  }

  function getSourcesFilteredBySize(sources:SourcesShape, breakpoints?:number[]):LocalSource[] {
    const wW = window.innerWidth;

    let sortedBySize:SizedSources = { 'max' : []};
    sources.forEach((source)=> {
      if (('maxWidth' in source) && source.maxWidth ) {
        const w = source.maxWidth.toString();
        if (sortedBySize != undefined && !Object.keys(sortedBySize).includes(w)) {
            sortedBySize[w] = [ source ];

        } else {
          sortedBySize[w].push(source);
        }
      } else if ('maxWidth' in source) {
        sortedBySize['max'].push(source)
      }
    })

    if (!breakpoints) {
      return sources.map((src:Source|LocalSource) => {
        return {
        url: src.url,
        type: 'local',
        fileType: getFileType(src.url)
      }
    });

    }

    let breakpointsWithPresent = [...breakpoints, wW].sort((a, b) => a - b)
    const currentIndex = breakpointsWithPresent.indexOf(wW);
    if (currentIndex == breakpointsWithPresent.length - 1) {
      return sortedBySize['max'];
    } else {
      return sortedBySize[breakpointsWithPresent[currentIndex+1].toString()];
    }


  }

 function getFileType(url:string):FileType {
      if (url.includes('.mp4')) {
        return 'mp4';
      }
      if (url.includes('.webm')) {

        return 'webm';
      }
      if (url.includes('.ogg')) {

        return 'ogg';
      }
      if (url.includes('.ogm')) {

        return 'ogm';
      }
      return 'mp4'
  }

  export {  getSourceType, compileSources, getFileType, prepareSingleSource , getSourcesFilteredBySize}