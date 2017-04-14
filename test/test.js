'use strict'

const chai = require('chai')

function Base () {}
Base.prototype.doSomething = function () {
  return 'done something'
}

class ClassBase {
  constructor () {}

  doStuff () {
    return 'done stuff'
  }
}

const SettingsMixin = require('..')

const expect = chai.expect

describe('Settings Mixin Test', () => {
  describe('Initialize class', () => {
    it('should be able to extend an existing function', () => {
      const Extended = SettingsMixin(Base)
      let instance = new Extended
      expect(instance.doSomething).to.be.a('function')
      expect(instance.doSomething()).to.equal('done something')
    })

    it('should be able to extend an existing class', () => {
      const Extended = SettingsMixin(ClassBase)
      let instance = new Extended
      expect(instance.doStuff).to.be.a('function')
      expect(instance.doStuff()).to.equal('done stuff')
    })

    it('should be able to produce a new class', () => {
      const Store = SettingsMixin()

      expect(Store).to.be.a('function')
    })

    it('should be extandable', () => {
      class Extended extends SettingsMixin() {
        doSomeMoreStuff () {
          return 'done some more stuff'
        }
      }
      let instance = new Extended
      
      expect(instance.set).to.be.a('function')
      expect(instance.get).to.be.a('function')
      expect(instance.doSomeMoreStuff).to.be.a('function')
    })
  })

  describe('Basic: Get/Set methods', () => {
    let Store = SettingsMixin()
    let instance = new Store
    
    it('should be able to store singleton settings', () => {
      expect(instance.settings.length).to.equal(0)

      instance.set('foo', 'bar')

      expect(instance.settings.length).to.equal(1)
    })

    it('should be able to get a stored setting', () => {
      expect(instance.get('foo')).to.be.equal('bar')
    })

    it('should return undefined when setting not found', () => {
      expect(instance.get('bar')).to.be.an('undefined')
    })

    it('should return the replacement when provided and setting not found', () => {
      expect(instance.get('bar', 'baz')).to.be.equal('baz')
    })

    it('should be chainable to store', () => {
      expect(instance.get('foo')).to.be.equal('bar')
      expect(instance.get('baz')).to.be.an('undefined')
      
      instance.set('foo','baz').set('baz','foo')

      expect(instance.get('foo')).to.be.equal('baz')
      expect(instance.get('baz')).to.be.equal('foo')
    })
  })

  describe('Extra: Multi Get/Set methods', () => {
    const Store = SettingsMixin({ multi: true })
    let instance = new Store

    it('should be possible to set multiple settings at once', () => {
      expect(instance.settings.length).to.be.equal(0)

      instance.settings = {
        'foo': 'bar',
        'bar': 'baz',
        'baz': 'foo'
      }

      expect(instance.settings.length).to.be.equal(3)
    })
    
    it('should be possible to get a shallow copy of multiple settings at once', () => {
      expect(instance.settings.length).to.be.equal(3)
    
      let object = instance.get(['foo', 'bar'])

      expect(object).to.be.deep.equal({ 'foo': 'bar', 'bar': 'baz' })
    })

    it('should be possible to get a single setting', () => {
      expect(instance.get('baz')).to.be.equal('foo')
    })
  })

  describe('Extra: Boolean methods', () => {
    const Store = SettingsMixin({ boolean: true })
    let instance = new Store
    
    instance.settings = {
      foo: 1,
      bar: 0,
      baz: '',
      bom: 'boom!',
      tru: true,
      fal: false
    }

    it('should be possible to get true only for truthy values', () => {
      // Numbers
      expect(instance.enabled('foo')).to.be.true
      expect(instance.disabled('foo')).to.be.false
      expect(instance.enabled('bar')).to.be.false
      expect(instance.disabled('bar')).to.be.true
      
      // Strings
      expect(instance.enabled('bom')).to.be.true
      expect(instance.disabled('bom')).to.be.false
      expect(instance.enabled('baz')).to.be.false
      expect(instance.disabled('baz')).to.be.true
      
      // Booleans
      expect(instance.enabled('tru')).to.be.true
      expect(instance.disabled('tru')).to.be.false
      expect(instance.enabled('fal')).to.be.false
      expect(instance.disabled('fal')).to.be.true
    })
    
    it('should be possible to enable/disable settings (as booleans)', () => {
      instance.enable('foo')
      instance.enable('bar')
      instance.enable('baz')
      instance.enable('bed')
      instance.disable('bom')
      instance.disable('tru')
      instance.disable('fal')
      instance.disable('fan')

      expect(instance.get('foo')).to.be.true
      expect(instance.get('bar')).to.be.true
      expect(instance.get('baz')).to.be.true
      expect(instance.get('bed')).to.be.true
      expect(instance.get('bom')).to.be.false
      expect(instance.get('tru')).to.be.false
      expect(instance.get('fan')).to.be.false
    })
  })

  describe('Extra: Number methods', () => {
    const Store = SettingsMixin({ number: true })
    let instance = new Store

    instance.set('num', 14)

    it('should be possible to increment/decrement with default step', () => {
      expect(instance.get('num')).to.be.equal(14)

      instance.increment('num')

      expect(instance.get('num')).to.be.equal(15)

      instance.decrement('num')
      
      expect(instance.get('num')).to.be.equal(14)
    })
    
    it('should be possible to increment/decement with spesified step', () => {
      expect(instance.get('num')).to.be.equal(14)

      instance.increment('num', 3)

      expect(instance.get('num')).to.be.equal(17)

      instance.decrement('num', 2)
      
      expect(instance.get('num')).to.be.equal(15)
    })
    
    it('should be possible to use gt & gte as intended', () => {
      instance.set('num', 14)

      expect(instance.gt('num',13)).to.be.true
      expect(instance.gte('num',13)).to.be.true

      expect(instance.gt('num',14)).to.be.false
      expect(instance.gte('num',14)).to.be.true

      expect(instance.gt('num',15)).to.be.false
      expect(instance.gte('num',15)).to.be.false
    })
    
    it('should be possible to use lt & lte as intended', () => {
      instance.set('num', 7)

      expect(instance.lt('num',13)).to.be.true
      expect(instance.lte('num',13)).to.be.true

      expect(instance.lt('num',7)).to.be.false
      expect(instance.lte('num',7)).to.be.true

      expect(instance.lt('num',3)).to.be.false
      expect(instance.lte('num',3)).to.be.false
    })
    
    it('should be possible to use eq & neq as intended', () => {
      instance.set('num', 10)

      expect(instance.eq('num',10)).to.be.true
      expect(instance.neq('num',10)).to.be.false

      expect(instance.neq('num',7)).to.be.true
      expect(instance.eq('num',7)).to.be.false
    })
    
    it('should be possible to use rg & nrg as intended', () => {
      instance.set('num', 5)

      expect(instance.rg('num', 2, 7)).to.be.true
      expect(instance.nrg('num', 2, 7)).to.be.false
      
      expect(instance.rg('num', 2, 4)).to.be.false
      expect(instance.nrg('num', 2, 4)).to.be.true

      expect(instance.rg('num', 6, 7)).to.be.false
      expect(instance.nrg('num', 6, 7)).to.be.true
    })
  })

  // describe('Extra: Statistics', () => {
  // 
  // })
})