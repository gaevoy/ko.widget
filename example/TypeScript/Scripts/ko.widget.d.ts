declare module "ko.widget" {
    class Widget {
        static extend(self: any, args: Array<any>): void;
        constructor(viewModel: any, view: any);
        appendTo(element: Element): void;
        exportMethods(...methodNames: string[]): void;
        init(): any;
        dispose(): void;
    }
    export = Widget;
}