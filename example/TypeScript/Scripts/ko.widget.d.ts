interface WidgetStatic {
    extend(self: any, args: Array<any>): void;
}

declare var Widget: WidgetStatic;

declare module "ko.widget" {
    export = Widget;
}
