Ext.define("MyWorkFlowApp.view.MyNestedList", {
    extend: "Ext.dataview.NestedList",
    alias: "widget.mynestedlist",
    config: {
        editing: false,
        isTapHold: false
    },
    initialize: function ()
        {
//            debugger;
            this.callParent(arguments);
            this.on("add", this.myOnAdd, this, {order: "after"});
            this.getActiveItem().on("itemtaphold", this.onHold, this);
        },
    myOnAdd: function (nestedlist, item)
        {
//            debugger;
            if (item.config.xtype == "list")
                {
//                    debugger;
                    item.on("itemtaphold", this.onHold, this);
                }
        },
    onHold: function (list, index, target, record, ev)
        {
//            debugger;
            this.setIsTapHold(true);
            this.fireEvent("itemtaphold", this, list, index, target, record, ev);
            /*
             if (this.getEditing())
             {
             this.setIsTapHold(true);
             this.fireEvent("itemtaphold", this, list, index, target, record, ev);
             }
             */
        },
    onItemTap: function (list, index, target, record, e)
        {
            if (!this.getIsTapHold())
                {
                    var me = this,
                            store = list.getStore(),
                            node = store.getAt(index);


                    me.fireEvent('itemtap', this, list, index, target, record, e);

                    if (node.isLeaf())
                        {
                            me.fireEvent('leafitemtap', this, list, index, target, record, e);
                            me.goToLeaf(node);
                        }
                    else
                        {
                            this.goToNode(node);
                        }
                }
            else
                {
                    this.setIsTapHold(false);
                }
        }
});