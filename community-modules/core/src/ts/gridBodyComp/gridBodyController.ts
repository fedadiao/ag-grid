import { BeanStub } from "../context/beanStub";
import { Autowired, PostConstruct, PreConstruct } from "../context/context";
import { LayoutFeature, LayoutView } from "../styling/layoutFeature";
import { Constants } from "../constants/constants";
import { Events } from "../eventKeys";
import { RowContainerHeightService } from "../rendering/rowContainerHeightService";
import { ControllersService } from "../controllersService";
import { GridOptionsWrapper } from "../gridOptionsWrapper";
import { setAriaColCount } from "../utils/aria";
import { ColumnController } from "../columnController/columnController";
import { ScrollVisibleService, SetScrollsVisibleParams } from "./scrollVisibleService";

export enum RowAnimationCssClasses {
    ANIMATION_ON = 'ag-row-animation',
    ANIMATION_OFF = 'ag-row-no-animation'
}

export const CSS_CLASS_FORCE_VERTICAL_SCROLL = 'ag-force-vertical-scroll';

export interface GridBodyView extends  LayoutView {
    setColumnCount(count: number): void;
    setProps(params: {enableRtl: boolean, printLayout: boolean}): void;
    setRowAnimationCssOnBodyViewport(animate: boolean): void;
    setAlwaysVerticalScrollClass(on: boolean): void;
    isVerticalScrollShowing(): boolean;
    getBodyHeight(): number;
    setVerticalScrollPaddingVisible(visible: boolean): void;
    checkScrollLeft(): void;
    registerBodyViewportResizeListener(listener: (()=>void)): void;
    clearBodyHeight(): void;
    checkBodyHeight(): void;
}

export class GridBodyController extends BeanStub {

    @Autowired('rowContainerHeightService') private rowContainerHeightService: RowContainerHeightService;
    @Autowired('controllersService') private controllersService: ControllersService;
    @Autowired('columnController') private columnController: ColumnController;
    @Autowired('scrollVisibleService') private scrollVisibleService: ScrollVisibleService;

    private view: GridBodyView;
    private eGridBody: HTMLElement;

    // properties we use a lot, so keep reference
    private enableRtl: boolean;
    private printLayout: boolean;

    @PostConstruct
    private postConstruct(): void {
        this.enableRtl = this.gridOptionsWrapper.isEnableRtl();
        this.printLayout = this.gridOptionsWrapper.getDomLayout() === Constants.DOM_LAYOUT_PRINT;
    }

    public setView(view: GridBodyView, eGridBody: HTMLElement): void {
        this.view = view;
        this.eGridBody = eGridBody;

        this.view.setProps({printLayout: this.printLayout, enableRtl: this.enableRtl});

        this.createManagedBean(new LayoutFeature(this.view));

        this.setupRowAnimationCssClass();

        this.controllersService.registerGridBodyController(this);

        this.addEventListeners();
        this.onGridColumnsChanged();
    }

    private addEventListeners(): void {
        this.addManagedListener(this.eventService, Events.EVENT_GRID_COLUMNS_CHANGED, this.onGridColumnsChanged.bind(this));
        this.addManagedListener(this.eventService, Events.EVENT_SCROLL_VISIBILITY_CHANGED, this.onScrollVisibilityChanged.bind(this));
        // this.addManagedListener(this.eventService, Events.EVENT_DISPLAYED_COLUMNS_WIDTH_CHANGED, this.onDisplayedColumnsWidthChanged.bind(this));
        // this.addManagedListener(this.eventService, Events.EVENT_PINNED_ROW_DATA_CHANGED, this.setHeaderAndFloatingHeights.bind(this));
        // this.addManagedListener(this.eventService, Events.EVENT_ROW_DATA_CHANGED, this.onRowDataChanged.bind(this));
        // this.addManagedListener(this.eventService, Events.EVENT_ROW_DATA_UPDATED, this.onRowDataChanged.bind(this));
        // this.addManagedListener(this.eventService, Events.EVENT_NEW_COLUMNS_LOADED, this.onNewColumnsLoaded.bind(this));

        // this.addManagedListener(this.gridOptionsWrapper, GridOptionsWrapper.PROP_DOM_LAYOUT, this.onDomLayoutChanged.bind(this));
    }

    private onScrollVisibilityChanged(): void {
        const show = this.scrollVisibleService.isVerticalScrollShowing();
        this.view.setVerticalScrollPaddingVisible(show);
    }

    private onGridColumnsChanged(): void {
        const columns = this.columnController.getAllGridColumns();
        this.view.setColumnCount(columns ? columns.length : 0);
    }

    public checkBodyHeight(): void {
        this.view.checkBodyHeight();
    }

    public clearBodyHeight(): void {
        this.view.clearBodyHeight();
    }

    public registerBodyViewportResizeListener(listener: (()=>void)): void {
        this.view.registerBodyViewportResizeListener(listener);
    }

    public checkScrollLeft(): void {
        this.view.checkScrollLeft();
    }

    public getBodyHeight(): number {
        return this.view.getBodyHeight();
    }

    public setVerticalScrollPaddingVisible(visible: boolean): void {
        this.view.setVerticalScrollPaddingVisible(visible);
    }

    public isVerticalScrollShowing(): boolean {
        const isAlwaysShowVerticalScroll = this.gridOptionsWrapper.isAlwaysShowVerticalScroll();
        this.view.setAlwaysVerticalScrollClass(isAlwaysShowVerticalScroll);
        return this.view.isVerticalScrollShowing();
    }

    private setupRowAnimationCssClass(): void {
        const listener = () => {
            // we don't want to use row animation if scaling, as rows jump strangely as you scroll,
            // when scaling and doing row animation.
            const animateRows = this.gridOptionsWrapper.isAnimateRows() && !this.rowContainerHeightService.isScaling();
            this.view.setRowAnimationCssOnBodyViewport(animateRows);
        };

        listener();

        this.addManagedListener(this.eventService, Events.EVENT_HEIGHT_SCALE_CHANGED, listener);
    }

    public getGridBodyElement(): HTMLElement {
        return this.eGridBody;
    }

}
