declare type CompiledSourcesOrFalse = CompiledSources | false;
interface CompiledSources {
    sources: SourcesShape;
    type: SourceType;
    url: string;
    breakpoints?: Array<number>;
}
declare function compileSources(srcString: string | null): CompiledSourcesOrFalse;
declare function getSourceType(url: string | null): SourceType;
declare function prepareSingleSource(url: string, size?: number | false): LocalSource | Source;
declare function getSourcesFilteredBySize(sources: SourcesShape, breakpoints?: number[]): LocalSource[];
declare function getFileType(url: string): FileType;
export { getSourceType, compileSources, getFileType, prepareSingleSource, getSourcesFilteredBySize };
