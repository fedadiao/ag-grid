export interface ChartOptions {
    parent?: HTMLElement;
    width?: number;
    height?: number;
    series?: any[];
    data?: any;
    padding?: IPadding;
    legendPosition?: LegendPosition;
    legendPadding?: number;
    tooltipClass?: string;
    legend?: LegendOptions;
    title?: CaptionOptions;
    subtitle?: CaptionOptions;
}

export type ChartToolbarOptions = 'chartSettings' | 'chartData' | 'chartDownload';

export enum ChartType {
    GroupedBar,
    StackedBar,
    Line,
    Pie,
    Doughnut
}

export interface CartesianChartOptions extends ChartOptions {
    xAxis: AxisOptions;
    yAxis: AxisOptions;
}

export interface BarChartOptions extends CartesianChartOptions {
    series?: BarSeriesOptions[];
    seriesDefaults?: BarSeriesOptions;
}

export interface LineChartOptions extends CartesianChartOptions {
    series?: LineChartOptions[];
    seriesDefaults?: LineSeriesOptions;
}

export interface PolarChartOptions extends ChartOptions {}

export interface PieChartOptions extends PolarChartOptions {
    series?: PieSeriesOptions[];
    seriesDefaults?: PieSeriesOptions;
}

export interface DoughnutChartOptions extends PolarChartOptions {
    series?: PieSeriesOptions[];
    seriesDefaults?: PieSeriesOptions;
}

interface IPadding {
    top: number;
    right: number;
    bottom: number;
    left: number;
}

export type LegendPosition = 'top' | 'right' | 'bottom' | 'left';

export interface AxisOptions {
    type?: 'category' | 'number';

    lineWidth?: number;
    lineColor?: string;

    tickWidth?: number;
    tickSize?: number;
    tickPadding?: number;
    tickColor?: string;

    labelFont?: string;
    labelColor?: string;
    labelRotation?: number;
    mirrorLabels?: boolean;
    parallelLabels?: boolean;
    labelFormatter?: (value: any, fractionDigits?: number) => string;
    gridStyle?: IGridStyle[];
}

export interface IGridStyle {
    stroke: string | null;
    lineDash: number[] | null;
}

export interface DropShadowOptions {
    color?: string;
    offset?: [number, number];
    blur?: number;
}

export interface SeriesOptions {
    type?: string;
    data?: any[];
    visible?: boolean;
    showInLegend?: boolean;
    tooltipEnabled?: boolean;
}

export interface LineTooltipRendererParams {
    datum: any;
    xField: string;
    yField: string;
}

export interface LineSeriesOptions extends SeriesOptions {
    title?: string;

    xField?: string;
    yField?: string;

    fill?: string;
    stroke?: string;
    strokeWidth?: number;

    marker?: boolean;
    markerSize?: number;
    markerLineWidth?: number;

    tooltipRenderer?: (params: LineTooltipRendererParams) => string;
}

export interface BarTooltipRendererParams {
    datum: any;
    xField: string;
    yField: string;
}

export interface BarSeriesOptions extends SeriesOptions {
    xField?: string;
    yFields?: string[];
    yFieldNames?: string[];

    grouped?: boolean;

    fills?: string[];
    strokes?: string[];
    strokeWidth?: number;

    shadow?: DropShadowOptions;

    labelEnabled?: boolean;
    labelFont?: string;
    labelColor?: string;
    labelPadding?: {x: number, y: number};

    tooltipRenderer?: (params: BarTooltipRendererParams) => string;
}

export interface PieTooltipRendererParams {
    datum: any;
    angleField: string;
    radiusField?: string;
    labelField?: string;
}

export interface PieSeriesOptions extends SeriesOptions {
    title?: string;
    titleEnabled?: boolean;
    titleFont?: string;

    fills?: string[];
    strokes?: string[];
    strokeWidth?: number;

    angleField?: string;
    radiusField?: string;

    labelEnabled?: boolean;
    labelField?: string;
    labelFont?: string;
    labelColor?: string;
    labelMinAngle?: number;

    calloutLength?: number;
    calloutStrokeWidth?: number;
    calloutPadding?: number;
    calloutColors?: string[];

    rotation?: number;

    outerRadiusOffset?: number;
    innerRadiusOffset?: number;

    shadow?: DropShadowOptions;

    tooltipRenderer?: (params: PieTooltipRendererParams) => string;
}

export interface LegendOptions {
    markerSize?: number;
    markerPadding?: number;
    markerStrokeWidth?: number;

    itemPaddingX?: number;
    itemPaddingY?: number;

    labelFont?: string;
    labelColor?: string;
}

export interface CaptionOptions {
    text?: string;
    font?: string;
    color?: string;
    enabled?: boolean;
}
