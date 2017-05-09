start 
set currentPath = %cd%

cd D:\Temp\MongoDB\bin
mongod.exe --config %currentPath %\config.txt

start 
cd D:\Temp\MongoDB\bin
mongo
