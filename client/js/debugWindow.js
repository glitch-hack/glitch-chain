

// ~~~~~~~~~~~~~~~~ Unstyled unstructured usage
//
//      var myDebugWindow = new DebugWindow('idOfMyDebugWindowDiv');
//      myDebugWindow.WriteLine('hello');
//
//
// ~~~~~~~~~~~~~~~~ BootStrap structure
//
//      var myDebugWindow = new DebugWindow('idOfMyDebugWindowDiv');
//      var myDebugWindow.AddRowCssClass('row');
//      var myDebugWindow.AddFirstColumnCssClass('col-md-2');
//      var myDebugWindow.AddSecondColumnCssClass('col-md-10');
//
//      myDebugWindow.WriteLine('hello');
//

function DebugWindow(domDivId_debugMessagesOutputDiv) {
    this.domDivId_debugMessagesOutputDiv = domDivId_debugMessagesOutputDiv;
    this.RowClasses = [];
    this.FirstColumnClasses = [];
    this.LastColumnClasses = [];
};

DebugWindow.prototype = {
    constructor: DebugWindow,
    WriteLine: function() {

      var args = [];
      for (var i = 0; i < arguments.length; ++i)
        args[i] = arguments[i];

        console.log(args);

        if(!(this.domDivId_debugMessagesOutputDiv === 'undefined'))
        {
            try {
                var newRow = document.getElementById(this.domDivId_debugMessagesOutputDiv).appendChild(
                    document.createElement("div"));

                newRow.className = this.GetRowCssClassString();

                var firstColumn = newRow.appendChild(
                    document.createElement("div"));

                firstColumn.className = this.GetFirstColumnCssClassString();
                firstColumn.appendChild(document.createTextNode(new Date().toLocaleString()));

                var secondColumn = newRow.appendChild(
                    document.createElement("div"));
                secondColumn.className = this.GetLastColumnCssClassString();

                for (var i = 0; i < args.length; ++i)
                  secondColumn.appendChild(document.createTextNode(args[i]));
            }
            catch (err) {
                console.log('Error creating dom :', err);
            }
        }
    },
    AddRowCssClass: function(className) {
        this.RowClasses.push(className);
    },
    AddFirstColumnCssClass: function(className) {
        this.FirstColumnClasses.push(className);
    },
    AddSecondColumnCssClass: function(className) {
        this.LastColumnClasses.push(className);
    },
    GetRowCssClassString: function () {
        if (this.RowClasses === undefined)
            return "";

        return this.RowClasses.join(" ");
    },
    GetFirstColumnCssClassString: function () {
        if (this.FirstColumnClasses === undefined)
            return "";

        return this.FirstColumnClasses.join(" ");
    },
    GetLastColumnCssClassString: function () {
        if (this.LastColumnClasses === undefined)
            return "";

        return this.LastColumnClasses.join(" ");
    }
}
