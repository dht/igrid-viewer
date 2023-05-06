export type Json = Record<string, any>;

export type WidgetId = string;

export type IWidget = {
  id: WidgetId;
  name: string;
  description?: string;
  component?: (props?: any) => JSX.Element;
  size: IWidgetSize;
  isBlock?: boolean;
  tags?: string[];
};

export type IWidgets = Record<string, IWidget>;

// widget instance
export type IElement = {
  id: string;
  widgetId: string;
  title?: string;
  position?: ICoordinates;
  dimension?: IDimension;
  boardId?: string;
  flavour?: string;
  flags?: IElementFlags;
  props?: Json;
  state?: Json;
};

export type IElements = Record<string, IElement>;

export type IElementsPerResolution = {
  default: IElements;
  mobile?: IElements;
  tablet?: IElements;
  '720p'?: IElements;
  HD?: IElements;
  'HD+'?: IElements;
  '1080p'?: IElements;
  '2k'?: IElements;
  '4k'?: IElements;
  '8k'?: IElements;
};

export type IWidgetSize = {
  defaultSize: IDimension;
  minimumSize?: Partial<IDimension>;
  maximumSize?: Partial<IDimension>;
};

export type IElementFlags = {
  hideHeader?: boolean;
  isTransparent?: boolean;
  allowOverflow?: boolean;
  isFullPage?: boolean;
  isFloating?: boolean;
  isHidden?: boolean;
};

export type ICoordinates = {
  x: number;
  y: number;
};

export type IDimension = {
  x: number;
  y: number;
};

export interface IWidgetLibraryBuilder {
  withWidgets(widgets: IWidget[]): IWidgetLibraryBuilder;
  build(): IWidgets;
}

export type IBoard = {
  id: string;
  boardInfo: IBoardInfo;
  elements: IElementsPerResolution;
  dependencies: Json;
  examplesUrl?: string;
  examples?: Json;
  siblingsUrl?: string;
  siblings?: ISiblings;
  adaptersUrl?: string;
  adapters?: IAdapters;
};

export type IBoardInfo = {
  name: string;
  imageUrl: string;
  description: string;
  fields: InfoField[];
  isPlayback: boolean;
  showIntro: boolean;
  githubUrl?: string;
};

export type InfoField = {
  label: string;
  content: string;
};

export type IBoundingBox = {
  top: number;
  left: number;
  width: number;
  height: number;
};

export type IGridPosition = ICoordinates & {
  rawPixels: {
    top: number;
    left: number;
    absoluteTop: number;
    absoluteLeft: number;
  };
};

export type GridMode = 'view' | 'edit';

export type IGridConfig = {
  initialMode?: GridMode;
  allowEditing?: boolean;
  darkMode?: boolean;
};

export type GridProviderProps = {
  id: string;
  flavour?: string;
  widgets: IWidgets;
  elements: IElements;
  config?: IGridConfig;
  children?: React.ReactNode;
  callbacks?: {};
  isMobileSupported?: boolean;
};

export type IGridState = {
  id: string;
  showToggle?: boolean;
  flavour?: string;
};

export type IGridContext = {
  config: IGridConfig;
  state: IGridState;
  elements: IElements;
  callbacks: {
    renderElement: (_instance: IElement) => JSX.Element;
    renderInfo: (_instance: IElement) => JSX.Element;
  };
  patchState: (change: Partial<IGridState>) => void;
};

export type Resolution =
  | 'default'
  | 'mobile'
  | 'tablet'
  | '720p'
  | 'HD'
  | 'HD+'
  | '1080p'
  | '2k'
  | '4k'
  | '8k';

export type ISibling = {
  id: string;
  name: string;
  description?: string;
  boardId: string;
  isEnabled?: boolean;
};

export type ISiblings = Record<string, ISibling>;

export type IAdapterConfig = {
  providerType: DataProvider;
  baseUrl: string;
  port: number;
  paths: {
    api: string;
    create: string;
    logs: string;
  };
};

export type IAdapters = {
  playbackAdapterUrl?: string;
  playbackAdapter?: IAdapterConfig;
  promptAdapterUrl?: string;
  promptAdapter?: IAdapterConfig;
  dbAdapterUrl?: string;
  dbAdapter?: IAdapterConfig;
};

export type DataProvider = 'AI-RUNNER' | 'REST' | 'FIRESTORE' | 'STATIC' | 'LOCALSTORAGE';
