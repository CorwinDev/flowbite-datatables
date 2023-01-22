// Same definitions as in diff-dom

interface elementNodeType {
    nodeName: string
    attributes?: { [key: string]: string }
    childNodes?: nodeType[] // eslint-disable-line no-use-before-define
    checked?: boolean
    value?: string | number
    selected?: boolean
}

interface textNodeType {
    nodeName: "#text" | "#comment"
    data: string
    childNodes?: never
}

type nodeType = elementNodeType | textNodeType


// Definitions for table cells and other table relevant data

interface cellType {
    data: string | number | boolean | elementNodeType[] | object;
    text?: string;
    order?: string | number;
}

type inputCellType = cellType | string | number | boolean;

interface headerCellType {
    data: string | number | boolean | elementNodeType[] | object;
    type?: "html";
    text?: string;
}

type inputHeaderCellType = headerCellType | string | number | boolean;


interface DataOption{
    headings?: string[];
    data?: inputCellType[][] ;
}

interface TableDataType{
    headings: headerCellType[];
    data: cellType[][] ;
}

type renderType = ((cellData: (string | number | boolean | object | elementNodeType[]), td: object, rowIndex: number, cellIndex: number) => elementNodeType | string | void);

export type DeepPartial<T> = T extends Function ? T : (T extends object ? { [P in keyof T]?: DeepPartial<T[P]>; } : T); // eslint-disable-line @typescript-eslint/ban-types
// Source https://gist.github.com/navix/6c25c15e0a2d3cd0e5bce999e0086fc9

interface ColumnOption{
    /**An integer or array of integers representing the column(s) to be manipulated. */
    select : number;
    /**Automatically sort the selected column. Can only be applied if a single column is selected. */
    sort? : "asc" | "desc";
    /**When set to false the column(s) cannot be sorted. */
    sortable? : boolean;
    /**When set to true the column(s) will not be visible and will be excluded from search results. */
    hidden?:boolean;
    /**
     * A string reperesenting the type of data in the column(s) cells. Choose from the following options:

    string - lexical ordering (default)
    number - any string with currency symbols, . or , thousand seperators, %, etc
    date - a valid datetime string
     */
    type?:string;
    /**A string representing the datetime format when using the date type. */
    format?:string;
    /**
     * A callback to customise the rendering of the column(s) cell content. The function takes 3 parameters and should return the formatted cell content.
     *
     */
    render?:renderType;
    /**
     * A filter to be used instead of sorting for the selected column(s).
     */
    filter?: (string | number | boolean | ((arg: (string | number | boolean)) => boolean))[];
}

interface LabelsConfiguration {
    /**
     * default: 'Search...'
     * Sets the placeholder of the search input.
     */
    placeholder: string;
    /**
     * default: '{select} entries per page'
     * Sets the per-page dropdown's label
     *
     * {select} - the per-page dropdown (required)
     */
    perPage: string;
    /**
     * default: 'No entries found'
     * The message displayed when there are no search results
     */
    noRows: string;
    /**
     * default: 'No results match your search query'
     * The message displayed when there are no search results
     */
    noResults: string;
    /**
     * default: 'Showing {start} to {end} of {rows} entries'
     * Displays current range, page number, etc
     *
     * {start} - The first row number of the current page
     * {end} - The last row number of the current page
     * {page} - The current page number
     * {pages} - Total pages
     * {rows} - Total rows
     */
    info: string;
}

interface ClassConfiguration {
    active: string;
    bottom: string;
    container: string;
    cursor: string;
    disabled: string;
    dropdown: string;
    ellipsis: string;
    empty: string;
    headercontainer: string;
    info: string;
    input: string;
    loading: string;
    pagination: string;
    paginationList: string;
    paginationListItem: string;
    paginationListItemLink: string;
    search: string;
    selector: string;
    sorter: string;
    table: string;
    top: string;
    wrapper: string;
}

type rowRenderType = ((row: object, tr: object, index: number) => elementNodeType | void);

type tableRenderType = ((data: object, table: elementNodeType, type: string) => elementNodeType | void);
// Type can be 'main', 'print', 'header' or 'message'


interface DataTableConfiguration {
    /**Controls various aspects of individual or groups of columns. Should be an array of objects with the following properties:
     *
     * Docs :https://github.com/fiduswriter/simple-datatables/wiki/columns
     */
    ascText: string;
    /**
    * Default: "▴"
    */
    classes: ClassConfiguration;
    columns: ColumnOption[];
    /**
     * Pass an object of data to populate the table.
     *
     * You can set both the headings and rows with headings and data properties, respectively. The headings property is optional.
     *
     * Docs : https://github.com/fiduswriter/simple-datatables/wiki/data
     */
    data: DataOption;
    /**
     * Whether to attempt to convert input data instead of assuming it is in simpel-datatables native format.
     * Is true by default.
     */
    dataConvert: boolean;
    /**Toggle the skip to first page and skip to last page buttons.
     * Default: false
     */
    descText: string;
     /**
     * Default: "▾"
     */
    destroyable: boolean;
    /**
     * Default: true
     * Whether enough information should be retained to be able to recreate the initial dom state before the table was initiated.
     */
    ellipsisText: string;
    /**
     * Default: '&hellip;'
     * Text to be used for ellipsis.
     */
    firstLast: boolean;
    /**
     * default: '&laquo;'
     * Set the content of the skip to first page button.
     *
     */
    firstText: string;
    /**
     * Default: true
     * Fix the width of the columns. This stops the columns changing width when loading a new page.
     */
    fixedColumns: boolean;
    /**
     * Default: false
     * Fix the height of the table. This is useful if your last page contains less rows than set in the perPage options and simply stops the table from changing size and affecting the layout of the page.
     */
    fixedHeight: boolean;
    /**
     * Default: false
     * Enable or disable the table footer.
     */
    footer: boolean;
    /**
     * Default :true
     * Enable or disable the table header.
     */
    header: boolean;
    /**
     * Default:false
     * Whether to hide the table header.
     */
    hiddenHeader: boolean;
    /**
     * Customise the displayed labels. (v1.0.6 and above)
     *
     * Defaults :
     *
     * labels: {
     *
            placeholder: "Search...",
            perPage: "{select} entries per page",
            noRows: "No entries to found",
            info: "Showing {start} to {end} of {rows} entries",
        }
     *
     * Docs : https://github.com/fiduswriter/simple-datatables/wiki/labels
     */
    labels: LabelsConfiguration;
    /**
     * Allows for custom arranging of the DOM elements in the top and bottom containers. There are for 4 variables you can utilize:
     *
     * Docs :https://github.com/fiduswriter/simple-datatables/wiki/layout
     */
    template: (DataTableConfiguration) => string;
    /**
     * default: '&raquo;'
     * Set the content of the skip to last page button.
     */
    lastText: string;
    /**
     * Default : true
     * Toggle the next and previous pagination buttons.
     */
    nextPrev: boolean;
    /**
     * default: '&rsaquo;'
     * Set the content on the next button.
     */
    nextText: string;
    /**
     * Default : true
     * Whether or not paging is enabled for the table
     */
    pagerDelta: number;
    /**
     * Default: 2
     * Delta to use with pager
     */
    paging: boolean;
    /**
     * Default : 10
     * Sets the maximum number of rows to display on each page.
     */
    perPage: number;
    /**
     * Default: [5, 10, 15, 20, 25]
     *
     * Sets the per page options in the dropdown. Must be an array of integers.
     *
     *   Setting this to false will hide the dropdown.
     */
    perPageSelect: (number | [string, number])[];
    /**
     * default: '&lsaquo;'
     * Set the content on the previous button.
     */
    prevText: string;
    /**
     * Default : ""
     *
     * Enable vertical scrolling. Vertical scrolling will constrain the DataTable to the given height, and enable scrolling for any data which overflows the current viewport. This can be used as an alternative to paging to display a lot of data in a small area.
     *
     * The value given here can be given in any CSS unit.
     */
    rowNavigation: boolean;
    /**
     * Default: true
     * Whether to allow row based navigation
     */
    rowRender: false | rowRenderType;
    /**
     * Default: false
     * Method to call to modify row rendering output.
     */
    scrollY: string;
    // for searching
    /**
     * Default: ""
     * Specify to create a table with a scrolling body and fixed header.
     */
    searchable: boolean;
    sensitivity: string,
    ignorePunctuation: boolean;
    // for sorting
    /**
     * Default: true
     * Toggle the ability to sort the columns.
     *
     * This option will be forced to false if the table has no headings.
     */
    sortable: boolean;
    locale: string;
    numeric: boolean;
    caseFirst: string;

    tabIndex: false | number;
    /**
     * Default: false
     * A tab index number to be assigned to the table.
     */
    tableRender: false | tableRenderType;
    /**
     * Default: false
     * Method to call to modify table rendering output.
     */
    truncatePager: boolean;
    /**
     * Default: true
     * Truncate the page links to prevent overflow with large datasets.
     */
}

interface DataTableOptions extends DeepPartial<DataTableConfiguration> {
    columns?: ColumnOption[];
    data?: DataOption;
    perPageSelect?: (number | [string, number])[];
    rowRender?: false | rowRenderType;
    tableRender?: false | tableRenderType;
}


interface singleColumnSettingsType {
    render?: renderType,
    type: ("date" | "html" | "number" | "boolean" | "string" | "other"),
    format?: string,
    // for sorting
    sortable?: boolean,
    locale?: string,
    numeric?: boolean,
    caseFirst?: string,
    // for searching
    searchable?: boolean,
    sensitivity?: string,
    ignorePunctuation?: boolean,
    //
    headerClass?: string,
    cellClass?: string,
    hidden?: boolean,
    filter?: (string | number | boolean | ((arg: (string | number | boolean)) => boolean))[],
    sort?: "asc" | "desc",
    sortSequence?: ("asc" | "desc")[],
}

interface allColumnSettingsType {
    columns: singleColumnSettingsType[],
    sort: (false | {column: number, dir: "asc" | "desc"})
}

interface renderOptions {
    noPaging?: true;
    noColumnWidths?: true;
    unhideHeader?: true;
    renderHeader?: true
}

type filterStateType = {
    column: number;
    state: (string | number | boolean | elementNodeType[] | object | ((arg: (string | number | boolean | elementNodeType[] | object)) => boolean));
}


export {
    allColumnSettingsType,
    cellType,
    DataOption,
    DataTableConfiguration,
    DataTableOptions,
    filterStateType,
    headerCellType,
    inputCellType,
    inputHeaderCellType,
    elementNodeType,
    nodeType,
    renderOptions,
    renderType,
    rowRenderType,
    singleColumnSettingsType,
    TableDataType,
    textNodeType
}
