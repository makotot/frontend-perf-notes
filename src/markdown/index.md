
## パフォーマンスがなぜ問題なのか

表示速度の低下は、コンバージョン、PV、顧客満足度に影響する。売り上げに直接影響する。  

> 80% of time is front-end - [Speed Matters // Speaker Deck](https://speakerdeck.com/zeman/speed-matters)

load timeの大部分はフロントエンド。


  - [Performance Testing Crash Course ](http://www.slideshare.net/appdynamics/performance-testing-crash-course)
  - [Improving UX through Front End Performance - Dyn](http://dyn.com/webperf/)
  - [【LED】勉強会①「フロントエンドパフォーマンス向上ルール」](http://www.slideshare.net/itosho/led-study001)



## どれぐらい速ければ充分速いといえるか

> Speed Index under 1000 - [Delivering The Goods - Fluent 2014 - Paul Irish - Google スライド](https://docs.google.com/presentation/d/1MtDBNTH1g7CZzhwlJ1raEJagA8qM3uoV7ta6i66bO2M/present?slide=id.g3eb97ca8f_1860)

[webpagetest](http://www.webpagetest.org/)のspeed indexの値が1000以下であることが望ましいらしい。


- [Fast Enough - TimKadlec.com](http://timkadlec.com/2014/01/fast-enough/)


## どのように計測するか

[YSlow](http://yslow.org/)や[PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/)、[WebPageTest](http://www.webpagetest.org/)、devtoolsなどのツールを利用する。  
簡易的に問題点を洗い出す時には、[YSlow](http://yslow.org/)や[PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/)で事足りるけど、
詳細なデータが欲しい場合には[WebPageTest](http://www.webpagetest.org/)、局所的に計測してチューニングしたい場合はdevtoolsとか。

- [Measure, Optimize, Automate](http://ponyfoo.com/articles/measure-optimize-automate)
- [Re-think about Web Performance](http://www.slideshare.net/1000ch/re-think-aboutwebperformance)
- [WebPagetest in 5 minutes — MOL](http://t32k.me/mol/log/webpagetest-5-minutes/)


### Synthetic vs RUM

- Synthetic : 人工の？計測。実際のユーザによるものではない。
- RUM : Real User Monitoring。実際のユーザから得られる計測。


- [Synthetic vs Real User Monitoring (RUM) – SpeedCurve Ideas, Support & Docs](https://speedcurve.uservoice.com/knowledgebase/articles/355134-synthetic-vs-real-user-monitoring-rum)
- [Synthetic Monitoring vs. Real User Monitoring (RUM)](https://www.apicasystem.com/blog/2014/11/19/synthetic-monitoring-vs-real-user-monitoring-rum-use/)
- [DIY Synthetic: Private WebPagetest Magic // Speaker Deck](https://speakerdeck.com/jklein/diy-synthetic-private-webpagetest-magic)

