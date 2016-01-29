declare class KoWidget {
    static extend(self: any, args: Array<any>): void;
    constructor(viewModel: any, view: any);
    appendTo(element: Element): void;
    exportMethods(...methodNames: string[]): void;
    init(): any;
    dispose(): void;
}

interface KoWidgetConstructor {
    new (viewModel: any, view: any): KoWidget;
}

interface KnockoutStatic {
    Widget: KoWidgetConstructor;
    widget: KoWidgetConstructor;
}

declare module "ko.widget" {
    export = KoWidget;
}