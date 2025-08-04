//+------------------------------------------------------------------+
//|                                                      TestEA.mq5 |
//|                                  Copyright 2024, MetaQuotes Ltd. |
//|                                             https://www.mql5.com |
//+------------------------------------------------------------------+
#property copyright "Copyright 2024, MetaQuotes Ltd."
#property link      "https://www.mql5.com"
#property version   "1.00"

//--- input parameters
input double   Lots          = 0.1;      // Lot size
input int      MagicNumber   = 12345;    // Magic number
input int      StopLoss      = 50;       // Stop loss in points
input int      TakeProfit    = 100;      // Take profit in points

//+------------------------------------------------------------------+
//| Expert initialization function                                   |
//+------------------------------------------------------------------+
int OnInit()
{
   Print("Test EA initialized successfully");
   return(INIT_SUCCEEDED);
}

//+------------------------------------------------------------------+
//| Expert deinitialization function                                 |
//+------------------------------------------------------------------+
void OnDeinit(const int reason)
{
   Print("Test EA deinitialized");
}

//+------------------------------------------------------------------+
//| Expert tick function                                             |
//+------------------------------------------------------------------+
void OnTick()
{
   // Simple trading logic for demonstration
   if(PositionsTotal() == 0)
   {
      double ask = SymbolInfoDouble(_Symbol, SYMBOL_ASK);
      double bid = SymbolInfoDouble(_Symbol, SYMBOL_BID);
      
      // Simple buy condition (this is just for testing)
      if(ask > 0)
      {
         MqlTradeRequest request;
         MqlTradeResult result;
         
         ZeroMemory(request);
         request.action = TRADE_ACTION_DEAL;
         request.symbol = _Symbol;
         request.volume = Lots;
         request.type = ORDER_TYPE_BUY;
         request.price = ask;
         request.sl = ask - StopLoss * _Point;
         request.tp = ask + TakeProfit * _Point;
         request.magic = MagicNumber;
         request.comment = "Test EA Buy Order";
         
         OrderSend(request, result);
      }
   }
}
