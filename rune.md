# Module `rune`
The `rune` module provides an encrypted file-based database solution with support for collections and maps. This module utilizes `conf` and it can only work inside of apps.

## Usage
```coffee
rune = imp 'rune'

myDB = rune.db 'myDatabase'

myCollection = myDB.collection 'myCollection'
myCollection.insert name: 'Jane Doe', age: 25

data = myCollection.list()
print data
```

## Database Initialization
Create a Database
```coffee{3}
rune = imp 'rune'

myDB = rune.db 'myDatabase', { initialData: 'value' }, 'myEncryptionKey'
```
+ `dbname`: The name of the database.
+ `data`: Initial data to populate the database (optional).
+ `encryptionKey`: Key used to encrypt and decrypt data (optional).

## Collections
Collections store and manage related records. Each collection is stored in its own file.

## Insert Record
```coffee{1}
myCollection = myDB.collection 'myCollection'
record = myCollection.insert name: 'Jane Doe', age: 25, hobbies: [ 'dancing' ]
print record
```
## Read Record
```coffee
record = myCollection.read 'recordId'
print record
```

## Update Record
```coffee
myCollection.update 'recordId', age: 26
myCollection.update { name: 'Jane Doe' }, age: 26

myCollection.update { name: 'Jane Doe' }, hobbies: rune.push 'gaming'
```
## Find Record
```coffee
myCollection.find name: 'Jane Doe'
```

## Remove Record
```coffee
myCollection.remove 'recordId'
```

## List All Records
```coffee
allRecords = myCollection.list()
print allRecords
```

## Refs
Refs work similarly to foreign keys in SQL, allowing references between records using simple strings.

## Create a Ref
```coffee
myCollection1 = myDB.collection 'collection1'
record1 = myCollection1.insert name: 'Parent Record'

record2 = myCollection1.insert name: 'Some Record', items: [ myDB.makeRef(record1) ]

myCollection2 = myDB.collection 'collection2'
record2 = myCollection2.insert name: 'Child Record', parentRef: myDB.makeRef(record1)
```

## Read a Ref
```coffee
parentRecord = myDB.findRef(record2.parentRef)
print parentRecord
```

> Keep in mind that refs are auto evaluated, and they work only one level down in a record structure.

## Maps
Maps store key-value pairs and are ideal for configuration settings or other data that fits a key-value model.

## Set Value
```coffee
myMap = myDB.map 'myMap'
myMap.set 'key', 'value'
```

## Get Value
```coffee
value = myMap.get 'key'
print value
```

## Remove Value
```coffee
myMap.remove 'key'
```

## List All Key-Value Pairs
```coffee
allData = myMap.list()
print allData
```

## Main Data Operations
The main db file can hold custom options, it holds key-value pair and works like a map, but on the main db manifest file.
## Setting Data
Set data at the root level of the database.

```coffee
myDB.setData key1: 'value1', key2: 'value2'
```
## Getting Data
Get data from the root level of the database.

```coffee
data = myDB.getData()
print data
```

## Advanced Usage
## Transforming Data
Transform data in a collection or map.

```coffee
myCollection.transform (data) ->
  data.map (record) ->
    record.age += 1
    record
```

## Filtering Data
Filter data in a collection or map.

```coffee
adults = myCollection.filter (record) -> record.age >= 18
print adults
```

## Sorting Data
Sort data in a collection or map.

```coffee
sortedRecords = myCollection.sort (a, b) -> a.age - b.age
print sortedRecords
```