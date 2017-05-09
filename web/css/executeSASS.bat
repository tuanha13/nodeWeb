cd E:/04-MyProject/Weber/WBER.CMS/03.SourceCode/WBER.EMS.Customer.Website/assets/css
rmdir /Q /S .sass-cache
del custom.css.map
sass --watch import.scss:custom.css --style compressed