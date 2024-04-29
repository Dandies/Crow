import {
  require_jsx_runtime
} from "/build/_shared/chunk-NMZL6IDN.js";
import {
  Global,
  ThemeContext,
  ThemeProvider,
  _extends,
  getRegisteredStyles,
  insertStyles,
  keyframes,
  memoize,
  registerStyles,
  serializeStyles,
  useInsertionEffectAlwaysWithSyncFallback,
  withEmotionCache
} from "/build/_shared/chunk-Z57QM6D6.js";
import {
  require_react_dom
} from "/build/_shared/chunk-GIAAE3CH.js";
import {
  require_react
} from "/build/_shared/chunk-BOXFZXVX.js";
import {
  __commonJS,
  __esm,
  __export,
  __toCommonJS,
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// node_modules/lodash.mergewith/index.js
var require_lodash = __commonJS({
  "node_modules/lodash.mergewith/index.js"(exports, module) {
    var LARGE_ARRAY_SIZE = 200;
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    var HOT_COUNT = 800;
    var HOT_SPAN = 16;
    var MAX_SAFE_INTEGER = 9007199254740991;
    var argsTag = "[object Arguments]";
    var arrayTag = "[object Array]";
    var asyncTag = "[object AsyncFunction]";
    var boolTag = "[object Boolean]";
    var dateTag = "[object Date]";
    var errorTag = "[object Error]";
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var mapTag = "[object Map]";
    var numberTag = "[object Number]";
    var nullTag = "[object Null]";
    var objectTag = "[object Object]";
    var proxyTag = "[object Proxy]";
    var regexpTag = "[object RegExp]";
    var setTag = "[object Set]";
    var stringTag = "[object String]";
    var undefinedTag = "[object Undefined]";
    var weakMapTag = "[object WeakMap]";
    var arrayBufferTag = "[object ArrayBuffer]";
    var dataViewTag = "[object DataView]";
    var float32Tag = "[object Float32Array]";
    var float64Tag = "[object Float64Array]";
    var int8Tag = "[object Int8Array]";
    var int16Tag = "[object Int16Array]";
    var int32Tag = "[object Int32Array]";
    var uint8Tag = "[object Uint8Array]";
    var uint8ClampedTag = "[object Uint8ClampedArray]";
    var uint16Tag = "[object Uint16Array]";
    var uint32Tag = "[object Uint32Array]";
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
    var freeGlobal = typeof globalThis == "object" && globalThis && globalThis.Object === Object && globalThis;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var freeProcess = moduleExports && freeGlobal.process;
    var nodeUtil = function() {
      try {
        var types2 = freeModule && freeModule.require && freeModule.require("util").types;
        if (types2) {
          return types2;
        }
        return freeProcess && freeProcess.binding && freeProcess.binding("util");
      } catch (e) {
      }
    }();
    var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
    function apply(func, thisArg, args) {
      switch (args.length) {
        case 0:
          return func.call(thisArg);
        case 1:
          return func.call(thisArg, args[0]);
        case 2:
          return func.call(thisArg, args[0], args[1]);
        case 3:
          return func.call(thisArg, args[0], args[1], args[2]);
      }
      return func.apply(thisArg, args);
    }
    function baseTimes(n, iteratee) {
      var index2 = -1, result = Array(n);
      while (++index2 < n) {
        result[index2] = iteratee(index2);
      }
      return result;
    }
    function baseUnary(func) {
      return function(value) {
        return func(value);
      };
    }
    function getValue(object, key) {
      return object == null ? void 0 : object[key];
    }
    function overArg(func, transform2) {
      return function(arg) {
        return func(transform2(arg));
      };
    }
    var arrayProto = Array.prototype;
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    var coreJsData = root["__core-js_shared__"];
    var funcToString = funcProto.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var maskSrcKey = function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
      return uid ? "Symbol(src)_1." + uid : "";
    }();
    var nativeObjectToString = objectProto.toString;
    var objectCtorString = funcToString.call(Object);
    var reIsNative = RegExp(
      "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    );
    var Buffer = moduleExports ? root.Buffer : void 0;
    var Symbol2 = root.Symbol;
    var Uint8Array = root.Uint8Array;
    var allocUnsafe = Buffer ? Buffer.allocUnsafe : void 0;
    var getPrototype = overArg(Object.getPrototypeOf, Object);
    var objectCreate = Object.create;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var splice = arrayProto.splice;
    var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
    var defineProperty = function() {
      try {
        var func = getNative(Object, "defineProperty");
        func({}, "", {});
        return func;
      } catch (e) {
      }
    }();
    var nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0;
    var nativeMax = Math.max;
    var nativeNow = Date.now;
    var Map2 = getNative(root, "Map");
    var nativeCreate = getNative(Object, "create");
    var baseCreate = function() {
      function object() {
      }
      return function(proto) {
        if (!isObject2(proto)) {
          return {};
        }
        if (objectCreate) {
          return objectCreate(proto);
        }
        object.prototype = proto;
        var result = new object();
        object.prototype = void 0;
        return result;
      };
    }();
    function Hash(entries) {
      var index2 = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index2 < length) {
        var entry = entries[index2];
        this.set(entry[0], entry[1]);
      }
    }
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
      this.size = 0;
    }
    function hashDelete(key) {
      var result = this.has(key) && delete this.__data__[key];
      this.size -= result ? 1 : 0;
      return result;
    }
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? void 0 : result;
      }
      return hasOwnProperty.call(data, key) ? data[key] : void 0;
    }
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
    }
    function hashSet(key, value) {
      var data = this.__data__;
      this.size += this.has(key) ? 0 : 1;
      data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
      return this;
    }
    Hash.prototype.clear = hashClear;
    Hash.prototype["delete"] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    function ListCache(entries) {
      var index2 = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index2 < length) {
        var entry = entries[index2];
        this.set(entry[0], entry[1]);
      }
    }
    function listCacheClear() {
      this.__data__ = [];
      this.size = 0;
    }
    function listCacheDelete(key) {
      var data = this.__data__, index2 = assocIndexOf(data, key);
      if (index2 < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index2 == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index2, 1);
      }
      --this.size;
      return true;
    }
    function listCacheGet(key) {
      var data = this.__data__, index2 = assocIndexOf(data, key);
      return index2 < 0 ? void 0 : data[index2][1];
    }
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }
    function listCacheSet(key, value) {
      var data = this.__data__, index2 = assocIndexOf(data, key);
      if (index2 < 0) {
        ++this.size;
        data.push([key, value]);
      } else {
        data[index2][1] = value;
      }
      return this;
    }
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype["delete"] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    function MapCache(entries) {
      var index2 = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index2 < length) {
        var entry = entries[index2];
        this.set(entry[0], entry[1]);
      }
    }
    function mapCacheClear() {
      this.size = 0;
      this.__data__ = {
        "hash": new Hash(),
        "map": new (Map2 || ListCache)(),
        "string": new Hash()
      };
    }
    function mapCacheDelete(key) {
      var result = getMapData(this, key)["delete"](key);
      this.size -= result ? 1 : 0;
      return result;
    }
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }
    function mapCacheSet(key, value) {
      var data = getMapData(this, key), size2 = data.size;
      data.set(key, value);
      this.size += data.size == size2 ? 0 : 1;
      return this;
    }
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype["delete"] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    function Stack(entries) {
      var data = this.__data__ = new ListCache(entries);
      this.size = data.size;
    }
    function stackClear() {
      this.__data__ = new ListCache();
      this.size = 0;
    }
    function stackDelete(key) {
      var data = this.__data__, result = data["delete"](key);
      this.size = data.size;
      return result;
    }
    function stackGet(key) {
      return this.__data__.get(key);
    }
    function stackHas(key) {
      return this.__data__.has(key);
    }
    function stackSet(key, value) {
      var data = this.__data__;
      if (data instanceof ListCache) {
        var pairs = data.__data__;
        if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
          pairs.push([key, value]);
          this.size = ++data.size;
          return this;
        }
        data = this.__data__ = new MapCache(pairs);
      }
      data.set(key, value);
      this.size = data.size;
      return this;
    }
    Stack.prototype.clear = stackClear;
    Stack.prototype["delete"] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;
    function arrayLikeKeys(value, inherited) {
      var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
      for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
        (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
        isIndex(key, length)))) {
          result.push(key);
        }
      }
      return result;
    }
    function assignMergeValue(object, key, value) {
      if (value !== void 0 && !eq(object[key], value) || value === void 0 && !(key in object)) {
        baseAssignValue(object, key, value);
      }
    }
    function assignValue(object, key, value) {
      var objValue = object[key];
      if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
        baseAssignValue(object, key, value);
      }
    }
    function assocIndexOf(array, key) {
      var length = array.length;
      while (length--) {
        if (eq(array[length][0], key)) {
          return length;
        }
      }
      return -1;
    }
    function baseAssignValue(object, key, value) {
      if (key == "__proto__" && defineProperty) {
        defineProperty(object, key, {
          "configurable": true,
          "enumerable": true,
          "value": value,
          "writable": true
        });
      } else {
        object[key] = value;
      }
    }
    var baseFor = createBaseFor();
    function baseGetTag(value) {
      if (value == null) {
        return value === void 0 ? undefinedTag : nullTag;
      }
      return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
    }
    function baseIsArguments(value) {
      return isObjectLike(value) && baseGetTag(value) == argsTag;
    }
    function baseIsNative(value) {
      if (!isObject2(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction4(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }
    function baseIsTypedArray(value) {
      return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
    }
    function baseKeysIn(object) {
      if (!isObject2(object)) {
        return nativeKeysIn(object);
      }
      var isProto = isPrototype(object), result = [];
      for (var key in object) {
        if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) {
          result.push(key);
        }
      }
      return result;
    }
    function baseMerge(object, source, srcIndex, customizer, stack) {
      if (object === source) {
        return;
      }
      baseFor(source, function(srcValue, key) {
        stack || (stack = new Stack());
        if (isObject2(srcValue)) {
          baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
        } else {
          var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : void 0;
          if (newValue === void 0) {
            newValue = srcValue;
          }
          assignMergeValue(object, key, newValue);
        }
      }, keysIn);
    }
    function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
      var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
      if (stacked) {
        assignMergeValue(object, key, stacked);
        return;
      }
      var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : void 0;
      var isCommon = newValue === void 0;
      if (isCommon) {
        var isArr = isArray(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
        newValue = srcValue;
        if (isArr || isBuff || isTyped) {
          if (isArray(objValue)) {
            newValue = objValue;
          } else if (isArrayLikeObject(objValue)) {
            newValue = copyArray(objValue);
          } else if (isBuff) {
            isCommon = false;
            newValue = cloneBuffer(srcValue, true);
          } else if (isTyped) {
            isCommon = false;
            newValue = cloneTypedArray(srcValue, true);
          } else {
            newValue = [];
          }
        } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
          newValue = objValue;
          if (isArguments(objValue)) {
            newValue = toPlainObject(objValue);
          } else if (!isObject2(objValue) || isFunction4(objValue)) {
            newValue = initCloneObject(srcValue);
          }
        } else {
          isCommon = false;
        }
      }
      if (isCommon) {
        stack.set(srcValue, newValue);
        mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
        stack["delete"](srcValue);
      }
      assignMergeValue(object, key, newValue);
    }
    function baseRest(func, start2) {
      return setToString(overRest(func, start2, identity), func + "");
    }
    var baseSetToString = !defineProperty ? identity : function(func, string) {
      return defineProperty(func, "toString", {
        "configurable": true,
        "enumerable": false,
        "value": constant(string),
        "writable": true
      });
    };
    function cloneBuffer(buffer, isDeep) {
      if (isDeep) {
        return buffer.slice();
      }
      var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
      buffer.copy(result);
      return result;
    }
    function cloneArrayBuffer(arrayBuffer) {
      var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
      new Uint8Array(result).set(new Uint8Array(arrayBuffer));
      return result;
    }
    function cloneTypedArray(typedArray, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
      return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
    }
    function copyArray(source, array) {
      var index2 = -1, length = source.length;
      array || (array = Array(length));
      while (++index2 < length) {
        array[index2] = source[index2];
      }
      return array;
    }
    function copyObject(source, props, object, customizer) {
      var isNew = !object;
      object || (object = {});
      var index2 = -1, length = props.length;
      while (++index2 < length) {
        var key = props[index2];
        var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
        if (newValue === void 0) {
          newValue = source[key];
        }
        if (isNew) {
          baseAssignValue(object, key, newValue);
        } else {
          assignValue(object, key, newValue);
        }
      }
      return object;
    }
    function createAssigner(assigner) {
      return baseRest(function(object, sources) {
        var index2 = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard2 = length > 2 ? sources[2] : void 0;
        customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
        if (guard2 && isIterateeCall(sources[0], sources[1], guard2)) {
          customizer = length < 3 ? void 0 : customizer;
          length = 1;
        }
        object = Object(object);
        while (++index2 < length) {
          var source = sources[index2];
          if (source) {
            assigner(object, source, index2, customizer);
          }
        }
        return object;
      });
    }
    function createBaseFor(fromRight) {
      return function(object, iteratee, keysFunc) {
        var index2 = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
        while (length--) {
          var key = props[fromRight ? length : ++index2];
          if (iteratee(iterable[key], key, iterable) === false) {
            break;
          }
        }
        return object;
      };
    }
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
    }
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : void 0;
    }
    function getRawTag(value) {
      var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
      try {
        value[symToStringTag] = void 0;
        var unmasked = true;
      } catch (e) {
      }
      var result = nativeObjectToString.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag] = tag;
        } else {
          delete value[symToStringTag];
        }
      }
      return result;
    }
    function initCloneObject(object) {
      return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
    }
    function isIndex(value, length) {
      var type = typeof value;
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
    }
    function isIterateeCall(value, index2, object) {
      if (!isObject2(object)) {
        return false;
      }
      var type = typeof index2;
      if (type == "number" ? isArrayLike(object) && isIndex(index2, object.length) : type == "string" && index2 in object) {
        return eq(object[index2], value);
      }
      return false;
    }
    function isKeyable(value) {
      var type = typeof value;
      return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
    }
    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    function isPrototype(value) {
      var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
      return value === proto;
    }
    function nativeKeysIn(object) {
      var result = [];
      if (object != null) {
        for (var key in Object(object)) {
          result.push(key);
        }
      }
      return result;
    }
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }
    function overRest(func, start2, transform2) {
      start2 = nativeMax(start2 === void 0 ? func.length - 1 : start2, 0);
      return function() {
        var args = arguments, index2 = -1, length = nativeMax(args.length - start2, 0), array = Array(length);
        while (++index2 < length) {
          array[index2] = args[start2 + index2];
        }
        index2 = -1;
        var otherArgs = Array(start2 + 1);
        while (++index2 < start2) {
          otherArgs[index2] = args[index2];
        }
        otherArgs[start2] = transform2(array);
        return apply(func, this, otherArgs);
      };
    }
    function safeGet(object, key) {
      if (key === "constructor" && typeof object[key] === "function") {
        return;
      }
      if (key == "__proto__") {
        return;
      }
      return object[key];
    }
    var setToString = shortOut(baseSetToString);
    function shortOut(func) {
      var count = 0, lastCalled = 0;
      return function() {
        var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
        lastCalled = stamp;
        if (remaining > 0) {
          if (++count >= HOT_COUNT) {
            return arguments[0];
          }
        } else {
          count = 0;
        }
        return func.apply(void 0, arguments);
      };
    }
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {
        }
        try {
          return func + "";
        } catch (e) {
        }
      }
      return "";
    }
    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }
    var isArguments = baseIsArguments(function() {
      return arguments;
    }()) ? baseIsArguments : function(value) {
      return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
    };
    var isArray = Array.isArray;
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction4(value);
    }
    function isArrayLikeObject(value) {
      return isObjectLike(value) && isArrayLike(value);
    }
    var isBuffer = nativeIsBuffer || stubFalse;
    function isFunction4(value) {
      if (!isObject2(value)) {
        return false;
      }
      var tag = baseGetTag(value);
      return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
    }
    function isLength(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    function isObject2(value) {
      var type = typeof value;
      return value != null && (type == "object" || type == "function");
    }
    function isObjectLike(value) {
      return value != null && typeof value == "object";
    }
    function isPlainObject(value) {
      if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
        return false;
      }
      var proto = getPrototype(value);
      if (proto === null) {
        return true;
      }
      var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
      return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
    }
    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
    function toPlainObject(value) {
      return copyObject(value, keysIn(value));
    }
    function keysIn(object) {
      return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
    }
    var mergeWith5 = createAssigner(function(object, source, srcIndex, customizer) {
      baseMerge(object, source, srcIndex, customizer);
    });
    function constant(value) {
      return function() {
        return value;
      };
    }
    function identity(value) {
      return value;
    }
    function stubFalse() {
      return false;
    }
    module.exports = mergeWith5;
  }
});

// node_modules/react-fast-compare/index.js
var require_react_fast_compare = __commonJS({
  "node_modules/react-fast-compare/index.js"(exports, module) {
    var hasElementType = typeof Element !== "undefined";
    var hasMap = typeof Map === "function";
    var hasSet = typeof Set === "function";
    var hasArrayBuffer = typeof ArrayBuffer === "function" && !!ArrayBuffer.isView;
    function equal(a, b) {
      if (a === b)
        return true;
      if (a && b && typeof a == "object" && typeof b == "object") {
        if (a.constructor !== b.constructor)
          return false;
        var length, i, keys2;
        if (Array.isArray(a)) {
          length = a.length;
          if (length != b.length)
            return false;
          for (i = length; i-- !== 0; )
            if (!equal(a[i], b[i]))
              return false;
          return true;
        }
        var it;
        if (hasMap && a instanceof Map && b instanceof Map) {
          if (a.size !== b.size)
            return false;
          it = a.entries();
          while (!(i = it.next()).done)
            if (!b.has(i.value[0]))
              return false;
          it = a.entries();
          while (!(i = it.next()).done)
            if (!equal(i.value[1], b.get(i.value[0])))
              return false;
          return true;
        }
        if (hasSet && a instanceof Set && b instanceof Set) {
          if (a.size !== b.size)
            return false;
          it = a.entries();
          while (!(i = it.next()).done)
            if (!b.has(i.value[0]))
              return false;
          return true;
        }
        if (hasArrayBuffer && ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
          length = a.length;
          if (length != b.length)
            return false;
          for (i = length; i-- !== 0; )
            if (a[i] !== b[i])
              return false;
          return true;
        }
        if (a.constructor === RegExp)
          return a.source === b.source && a.flags === b.flags;
        if (a.valueOf !== Object.prototype.valueOf && typeof a.valueOf === "function" && typeof b.valueOf === "function")
          return a.valueOf() === b.valueOf();
        if (a.toString !== Object.prototype.toString && typeof a.toString === "function" && typeof b.toString === "function")
          return a.toString() === b.toString();
        keys2 = Object.keys(a);
        length = keys2.length;
        if (length !== Object.keys(b).length)
          return false;
        for (i = length; i-- !== 0; )
          if (!Object.prototype.hasOwnProperty.call(b, keys2[i]))
            return false;
        if (hasElementType && a instanceof Element)
          return false;
        for (i = length; i-- !== 0; ) {
          if ((keys2[i] === "_owner" || keys2[i] === "__v" || keys2[i] === "__o") && a.$$typeof) {
            continue;
          }
          if (!equal(a[keys2[i]], b[keys2[i]]))
            return false;
        }
        return true;
      }
      return a !== a && b !== b;
    }
    module.exports = function isEqual2(a, b) {
      try {
        return equal(a, b);
      } catch (error2) {
        if ((error2.message || "").match(/stack|recursion/i)) {
          console.warn("react-fast-compare cannot handle circular refs");
          return false;
        }
        throw error2;
      }
    };
  }
});

// node_modules/@emotion/is-prop-valid/node_modules/@emotion/memoize/dist/memoize.browser.esm.js
function memoize4(fn2) {
  var cache = {};
  return function(arg) {
    if (cache[arg] === void 0)
      cache[arg] = fn2(arg);
    return cache[arg];
  };
}
var memoize_browser_esm_default;
var init_memoize_browser_esm = __esm({
  "node_modules/@emotion/is-prop-valid/node_modules/@emotion/memoize/dist/memoize.browser.esm.js"() {
    memoize_browser_esm_default = memoize4;
  }
});

// node_modules/@emotion/is-prop-valid/dist/is-prop-valid.browser.esm.js
var is_prop_valid_browser_esm_exports = {};
__export(is_prop_valid_browser_esm_exports, {
  default: () => is_prop_valid_browser_esm_default
});
var reactPropsRegex2, index, is_prop_valid_browser_esm_default;
var init_is_prop_valid_browser_esm = __esm({
  "node_modules/@emotion/is-prop-valid/dist/is-prop-valid.browser.esm.js"() {
    init_memoize_browser_esm();
    reactPropsRegex2 = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|inert|itemProp|itemScope|itemType|itemID|itemRef|on|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/;
    index = memoize_browser_esm_default(
      function(prop) {
        return reactPropsRegex2.test(prop) || prop.charCodeAt(0) === 111 && prop.charCodeAt(1) === 110 && prop.charCodeAt(2) < 91;
      }
      /* Z+1 */
    );
    is_prop_valid_browser_esm_default = index;
  }
});

// node_modules/@chakra-ui/css-reset/dist/chunk-B4LBJQ3X.mjs
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
"use client";
var css = String.raw;
var vhPolyfill = css`
  :root,
  :host {
    --chakra-vh: 100vh;
  }

  @supports (height: -webkit-fill-available) {
    :root,
    :host {
      --chakra-vh: -webkit-fill-available;
    }
  }

  @supports (height: -moz-fill-available) {
    :root,
    :host {
      --chakra-vh: -moz-fill-available;
    }
  }

  @supports (height: 100dvh) {
    :root,
    :host {
      --chakra-vh: 100dvh;
    }
  }
`;
var CSSPolyfill = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Global, { styles: vhPolyfill });
var CSSReset = ({ scope = "" }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
  Global,
  {
    styles: css`
      html {
        line-height: 1.5;
        -webkit-text-size-adjust: 100%;
        font-family: system-ui, sans-serif;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
        -moz-osx-font-smoothing: grayscale;
        touch-action: manipulation;
      }

      body {
        position: relative;
        min-height: 100%;
        margin: 0;
        font-feature-settings: "kern";
      }

      ${scope} :where(*, *::before, *::after) {
        border-width: 0;
        border-style: solid;
        box-sizing: border-box;
        word-wrap: break-word;
      }

      main {
        display: block;
      }

      ${scope} hr {
        border-top-width: 1px;
        box-sizing: content-box;
        height: 0;
        overflow: visible;
      }

      ${scope} :where(pre, code, kbd,samp) {
        font-family: SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 1em;
      }

      ${scope} a {
        background-color: transparent;
        color: inherit;
        text-decoration: inherit;
      }

      ${scope} abbr[title] {
        border-bottom: none;
        text-decoration: underline;
        -webkit-text-decoration: underline dotted;
        text-decoration: underline dotted;
      }

      ${scope} :where(b, strong) {
        font-weight: bold;
      }

      ${scope} small {
        font-size: 80%;
      }

      ${scope} :where(sub,sup) {
        font-size: 75%;
        line-height: 0;
        position: relative;
        vertical-align: baseline;
      }

      ${scope} sub {
        bottom: -0.25em;
      }

      ${scope} sup {
        top: -0.5em;
      }

      ${scope} img {
        border-style: none;
      }

      ${scope} :where(button, input, optgroup, select, textarea) {
        font-family: inherit;
        font-size: 100%;
        line-height: 1.15;
        margin: 0;
      }

      ${scope} :where(button, input) {
        overflow: visible;
      }

      ${scope} :where(button, select) {
        text-transform: none;
      }

      ${scope} :where(
          button::-moz-focus-inner,
          [type="button"]::-moz-focus-inner,
          [type="reset"]::-moz-focus-inner,
          [type="submit"]::-moz-focus-inner
        ) {
        border-style: none;
        padding: 0;
      }

      ${scope} fieldset {
        padding: 0.35em 0.75em 0.625em;
      }

      ${scope} legend {
        box-sizing: border-box;
        color: inherit;
        display: table;
        max-width: 100%;
        padding: 0;
        white-space: normal;
      }

      ${scope} progress {
        vertical-align: baseline;
      }

      ${scope} textarea {
        overflow: auto;
      }

      ${scope} :where([type="checkbox"], [type="radio"]) {
        box-sizing: border-box;
        padding: 0;
      }

      ${scope} input[type="number"]::-webkit-inner-spin-button,
      ${scope} input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none !important;
      }

      ${scope} input[type="number"] {
        -moz-appearance: textfield;
      }

      ${scope} input[type="search"] {
        -webkit-appearance: textfield;
        outline-offset: -2px;
      }

      ${scope} input[type="search"]::-webkit-search-decoration {
        -webkit-appearance: none !important;
      }

      ${scope} ::-webkit-file-upload-button {
        -webkit-appearance: button;
        font: inherit;
      }

      ${scope} details {
        display: block;
      }

      ${scope} summary {
        display: list-item;
      }

      template {
        display: none;
      }

      [hidden] {
        display: none !important;
      }

      ${scope} :where(
          blockquote,
          dl,
          dd,
          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          hr,
          figure,
          p,
          pre
        ) {
        margin: 0;
      }

      ${scope} button {
        background: transparent;
        padding: 0;
      }

      ${scope} fieldset {
        margin: 0;
        padding: 0;
      }

      ${scope} :where(ol, ul) {
        margin: 0;
        padding: 0;
      }

      ${scope} textarea {
        resize: vertical;
      }

      ${scope} :where(button, [role="button"]) {
        cursor: pointer;
      }

      ${scope} button::-moz-focus-inner {
        border: 0 !important;
      }

      ${scope} table {
        border-collapse: collapse;
      }

      ${scope} :where(h1, h2, h3, h4, h5, h6) {
        font-size: inherit;
        font-weight: inherit;
      }

      ${scope} :where(button, input, optgroup, select, textarea) {
        padding: 0;
        line-height: inherit;
        color: inherit;
      }

      ${scope} :where(img, svg, video, canvas, audio, iframe, embed, object) {
        display: block;
      }

      ${scope} :where(img, video) {
        max-width: 100%;
        height: auto;
      }

      [data-js-focus-visible]
        :focus:not([data-focus-visible-added]):not(
          [data-focus-visible-disabled]
        ) {
        outline: none;
        box-shadow: none;
      }

      ${scope} select::-ms-expand {
        display: none;
      }

      ${vhPolyfill}
    `
  }
);

// node_modules/@chakra-ui/css-reset/dist/index.mjs
"use client";

// node_modules/@chakra-ui/react-context/dist/index.mjs
var import_react2 = __toESM(require_react(), 1);
"use client";
function getErrorMessage(hook, provider) {
  return `${hook} returned \`undefined\`. Seems you forgot to wrap component within ${provider}`;
}
function createContext(options = {}) {
  const {
    name,
    strict = true,
    hookName = "useContext",
    providerName = "Provider",
    errorMessage,
    defaultValue
  } = options;
  const Context = (0, import_react2.createContext)(defaultValue);
  Context.displayName = name;
  function useContext12() {
    var _a7;
    const context = (0, import_react2.useContext)(Context);
    if (!context && strict) {
      const error2 = new Error(
        errorMessage != null ? errorMessage : getErrorMessage(hookName, providerName)
      );
      error2.name = "ContextError";
      (_a7 = Error.captureStackTrace) == null ? void 0 : _a7.call(Error, error2, useContext12);
      throw error2;
    }
    return context;
  }
  return [Context.Provider, useContext12, Context];
}

// node_modules/@chakra-ui/portal/dist/chunk-HK66PB7M.mjs
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
"use client";
var [PortalManagerContextProvider, usePortalManager] = createContext({
  strict: false,
  name: "PortalManagerContext"
});
function PortalManager(props) {
  const { children, zIndex } = props;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(PortalManagerContextProvider, { value: { zIndex }, children });
}
PortalManager.displayName = "PortalManager";

// node_modules/@chakra-ui/react-use-safe-layout-effect/dist/index.mjs
var import_react3 = __toESM(require_react(), 1);
"use client";
var useSafeLayoutEffect = Boolean(globalThis == null ? void 0 : globalThis.document) ? import_react3.useLayoutEffect : import_react3.useEffect;

// node_modules/@chakra-ui/portal/dist/chunk-34PD6CUK.mjs
var import_react_dom = __toESM(require_react_dom(), 1);
var import_react4 = __toESM(require_react(), 1);
var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
"use client";
var [PortalContextProvider, usePortalContext] = createContext({
  strict: false,
  name: "PortalContext"
});
var PORTAL_CLASSNAME = "chakra-portal";
var PORTAL_SELECTOR = `.chakra-portal`;
var Container = (props) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
  "div",
  {
    className: "chakra-portal-zIndex",
    style: {
      position: "absolute",
      zIndex: props.zIndex,
      top: 0,
      left: 0,
      right: 0
      // NB: Don't add `bottom: 0`, it makes the entire app unusable
      // @see https://github.com/chakra-ui/chakra-ui/issues/3201
    },
    children: props.children
  }
);
var DefaultPortal = (props) => {
  const { appendToParentPortal, children } = props;
  const [tempNode, setTempNode] = (0, import_react4.useState)(null);
  const portal = (0, import_react4.useRef)(null);
  const [, forceUpdate] = (0, import_react4.useState)({});
  (0, import_react4.useEffect)(() => forceUpdate({}), []);
  const parentPortal = usePortalContext();
  const manager = usePortalManager();
  useSafeLayoutEffect(() => {
    if (!tempNode)
      return;
    const doc = tempNode.ownerDocument;
    const host = appendToParentPortal ? parentPortal != null ? parentPortal : doc.body : doc.body;
    if (!host)
      return;
    portal.current = doc.createElement("div");
    portal.current.className = PORTAL_CLASSNAME;
    host.appendChild(portal.current);
    forceUpdate({});
    const portalNode = portal.current;
    return () => {
      if (host.contains(portalNode)) {
        host.removeChild(portalNode);
      }
    };
  }, [tempNode]);
  const _children = (manager == null ? void 0 : manager.zIndex) ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Container, { zIndex: manager == null ? void 0 : manager.zIndex, children }) : children;
  return portal.current ? (0, import_react_dom.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(PortalContextProvider, { value: portal.current, children: _children }),
    portal.current
  ) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    "span",
    {
      ref: (el) => {
        if (el)
          setTempNode(el);
      }
    }
  );
};
var ContainerPortal = (props) => {
  const { children, containerRef, appendToParentPortal } = props;
  const containerEl = containerRef.current;
  const host = containerEl != null ? containerEl : typeof window !== "undefined" ? document.body : void 0;
  const portal = (0, import_react4.useMemo)(() => {
    const node = containerEl == null ? void 0 : containerEl.ownerDocument.createElement("div");
    if (node)
      node.className = PORTAL_CLASSNAME;
    return node;
  }, [containerEl]);
  const [, forceUpdate] = (0, import_react4.useState)({});
  useSafeLayoutEffect(() => forceUpdate({}), []);
  useSafeLayoutEffect(() => {
    if (!portal || !host)
      return;
    host.appendChild(portal);
    return () => {
      host.removeChild(portal);
    };
  }, [portal, host]);
  if (host && portal) {
    return (0, import_react_dom.createPortal)(
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(PortalContextProvider, { value: appendToParentPortal ? portal : null, children }),
      portal
    );
  }
  return null;
};
function Portal(props) {
  const portalProps = {
    appendToParentPortal: true,
    ...props
  };
  const { containerRef, ...rest } = portalProps;
  return containerRef ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ContainerPortal, { containerRef, ...rest }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(DefaultPortal, { ...rest });
}
Portal.className = PORTAL_CLASSNAME;
Portal.selector = PORTAL_SELECTOR;
Portal.displayName = "Portal";

// node_modules/@chakra-ui/portal/dist/index.mjs
"use client";

// node_modules/@chakra-ui/system/dist/chunk-UIGT7YZF.mjs
var import_react6 = __toESM(require_react(), 1);
"use client";
function useTheme() {
  const theme2 = (0, import_react6.useContext)(
    ThemeContext
  );
  if (!theme2) {
    throw Error(
      "useTheme: `theme` is undefined. Seems you forgot to wrap your app in `<ChakraProvider />` or `<ThemeProvider />`"
    );
  }
  return theme2;
}

// node_modules/@chakra-ui/color-mode/dist/chunk-UQDW7KKV.mjs
var import_react7 = __toESM(require_react(), 1);
"use client";
var ColorModeContext = (0, import_react7.createContext)({});
ColorModeContext.displayName = "ColorModeContext";
function useColorMode() {
  const context = (0, import_react7.useContext)(ColorModeContext);
  if (context === void 0) {
    throw new Error("useColorMode must be used within a ColorModeProvider");
  }
  return context;
}

// node_modules/@chakra-ui/color-mode/dist/chunk-X7ZBZ4KW.mjs
"use client";
var classNames = {
  light: "chakra-ui-light",
  dark: "chakra-ui-dark"
};
function getColorModeUtils(options = {}) {
  const { preventTransition = true } = options;
  const utils = {
    setDataset: (value) => {
      const cleanup = preventTransition ? utils.preventTransition() : void 0;
      document.documentElement.dataset.theme = value;
      document.documentElement.style.colorScheme = value;
      cleanup == null ? void 0 : cleanup();
    },
    setClassName(dark) {
      document.body.classList.add(dark ? classNames.dark : classNames.light);
      document.body.classList.remove(dark ? classNames.light : classNames.dark);
    },
    query() {
      return window.matchMedia("(prefers-color-scheme: dark)");
    },
    getSystemTheme(fallback) {
      var _a7;
      const dark = (_a7 = utils.query().matches) != null ? _a7 : fallback === "dark";
      return dark ? "dark" : "light";
    },
    addListener(fn2) {
      const mql = utils.query();
      const listener = (e) => {
        fn2(e.matches ? "dark" : "light");
      };
      if (typeof mql.addListener === "function")
        mql.addListener(listener);
      else
        mql.addEventListener("change", listener);
      return () => {
        if (typeof mql.removeListener === "function")
          mql.removeListener(listener);
        else
          mql.removeEventListener("change", listener);
      };
    },
    preventTransition() {
      const css3 = document.createElement("style");
      css3.appendChild(
        document.createTextNode(
          `*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`
        )
      );
      document.head.appendChild(css3);
      return () => {
        ;
        (() => window.getComputedStyle(document.body))();
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            document.head.removeChild(css3);
          });
        });
      };
    }
  };
  return utils;
}

// node_modules/@chakra-ui/color-mode/dist/chunk-44OWBZ77.mjs
"use client";
var STORAGE_KEY = "chakra-ui-color-mode";
function createLocalStorageManager(key) {
  return {
    ssr: false,
    type: "localStorage",
    get(init) {
      if (!(globalThis == null ? void 0 : globalThis.document))
        return init;
      let value;
      try {
        value = localStorage.getItem(key) || init;
      } catch (e) {
      }
      return value || init;
    },
    set(value) {
      try {
        localStorage.setItem(key, value);
      } catch (e) {
      }
    }
  };
}
var localStorageManager = createLocalStorageManager(STORAGE_KEY);
function parseCookie(cookie, key) {
  const match = cookie.match(new RegExp(`(^| )${key}=([^;]+)`));
  return match == null ? void 0 : match[2];
}
function createCookieStorageManager(key, cookie) {
  return {
    ssr: !!cookie,
    type: "cookie",
    get(init) {
      if (cookie)
        return parseCookie(cookie, key);
      if (!(globalThis == null ? void 0 : globalThis.document))
        return init;
      return parseCookie(document.cookie, key) || init;
    },
    set(value) {
      document.cookie = `${key}=${value}; max-age=31536000; path=/`;
    }
  };
}
var cookieStorageManager = createCookieStorageManager(STORAGE_KEY);

// node_modules/@chakra-ui/color-mode/dist/chunk-AMBGAKG2.mjs
var import_react8 = __toESM(require_react(), 1);
var import_jsx_runtime4 = __toESM(require_jsx_runtime(), 1);
"use client";
var noop = () => {
};
function getTheme(manager, fallback) {
  return manager.type === "cookie" && manager.ssr ? manager.get(fallback) : fallback;
}
function ColorModeProvider(props) {
  const {
    value,
    children,
    options: {
      useSystemColorMode,
      initialColorMode,
      disableTransitionOnChange
    } = {},
    colorModeManager = localStorageManager
  } = props;
  const defaultColorMode = initialColorMode === "dark" ? "dark" : "light";
  const [colorMode, rawSetColorMode] = (0, import_react8.useState)(
    () => getTheme(colorModeManager, defaultColorMode)
  );
  const [resolvedColorMode, setResolvedColorMode] = (0, import_react8.useState)(
    () => getTheme(colorModeManager)
  );
  const { getSystemTheme, setClassName, setDataset, addListener } = (0, import_react8.useMemo)(
    () => getColorModeUtils({ preventTransition: disableTransitionOnChange }),
    [disableTransitionOnChange]
  );
  const resolvedValue = initialColorMode === "system" && !colorMode ? resolvedColorMode : colorMode;
  const setColorMode = (0, import_react8.useCallback)(
    (value2) => {
      const resolved = value2 === "system" ? getSystemTheme() : value2;
      rawSetColorMode(resolved);
      setClassName(resolved === "dark");
      setDataset(resolved);
      colorModeManager.set(resolved);
    },
    [colorModeManager, getSystemTheme, setClassName, setDataset]
  );
  useSafeLayoutEffect(() => {
    if (initialColorMode === "system") {
      setResolvedColorMode(getSystemTheme());
    }
  }, []);
  (0, import_react8.useEffect)(() => {
    const managerValue = colorModeManager.get();
    if (managerValue) {
      setColorMode(managerValue);
      return;
    }
    if (initialColorMode === "system") {
      setColorMode("system");
      return;
    }
    setColorMode(defaultColorMode);
  }, [colorModeManager, defaultColorMode, initialColorMode, setColorMode]);
  const toggleColorMode = (0, import_react8.useCallback)(() => {
    setColorMode(resolvedValue === "dark" ? "light" : "dark");
  }, [resolvedValue, setColorMode]);
  (0, import_react8.useEffect)(() => {
    if (!useSystemColorMode)
      return;
    return addListener(setColorMode);
  }, [useSystemColorMode, addListener, setColorMode]);
  const context = (0, import_react8.useMemo)(
    () => ({
      colorMode: value != null ? value : resolvedValue,
      toggleColorMode: value ? noop : toggleColorMode,
      setColorMode: value ? noop : setColorMode,
      forced: value !== void 0
    }),
    [resolvedValue, toggleColorMode, setColorMode, value]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ColorModeContext.Provider, { value: context, children });
}
ColorModeProvider.displayName = "ColorModeProvider";
function DarkMode(props) {
  const context = (0, import_react8.useMemo)(
    () => ({
      colorMode: "dark",
      toggleColorMode: noop,
      setColorMode: noop,
      forced: true
    }),
    []
  );
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ColorModeContext.Provider, { value: context, ...props });
}
DarkMode.displayName = "DarkMode";
function LightMode(props) {
  const context = (0, import_react8.useMemo)(
    () => ({
      colorMode: "light",
      toggleColorMode: noop,
      setColorMode: noop,
      forced: true
    }),
    []
  );
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ColorModeContext.Provider, { value: context, ...props });
}
LightMode.displayName = "LightMode";

// node_modules/@chakra-ui/color-mode/dist/index.mjs
"use client";

// node_modules/@chakra-ui/system/dist/chunk-7FWEOSAE.mjs
"use client";
function useChakra() {
  const colorModeResult = useColorMode();
  const theme2 = useTheme();
  return { ...colorModeResult, theme: theme2 };
}

// node_modules/@chakra-ui/shared-utils/dist/index.mjs
var cx = (...classNames2) => classNames2.filter(Boolean).join(" ");
function isObject(value) {
  const type = typeof value;
  return value != null && (type === "object" || type === "function") && !Array.isArray(value);
}
function runIfFn(valueOrFn, ...args) {
  return isFunction(valueOrFn) ? valueOrFn(...args) : valueOrFn;
}
var isFunction = (value) => typeof value === "function";
function callAllHandlers(...fns) {
  return function func(event) {
    fns.some((fn2) => {
      fn2 == null ? void 0 : fn2(event);
      return event == null ? void 0 : event.defaultPrevented;
    });
  };
}

// node_modules/@chakra-ui/styled-system/dist/index.mjs
var import_lodash = __toESM(require_lodash(), 1);
var import_lodash2 = __toESM(require_lodash(), 1);
var import_lodash3 = __toESM(require_lodash(), 1);
var import_lodash4 = __toESM(require_lodash(), 1);
var isImportant = (value) => /!(important)?$/.test(value);
var withoutImportant = (value) => typeof value === "string" ? value.replace(/!(important)?$/, "").trim() : value;
var tokenToCSSVar = (scale3, value) => (theme2) => {
  const valueStr = String(value);
  const important = isImportant(valueStr);
  const valueWithoutImportant = withoutImportant(valueStr);
  const key = scale3 ? `${scale3}.${valueWithoutImportant}` : valueWithoutImportant;
  let transformed = isObject(theme2.__cssMap) && key in theme2.__cssMap ? theme2.__cssMap[key].varRef : value;
  transformed = withoutImportant(transformed);
  return important ? `${transformed} !important` : transformed;
};
function createTransform(options) {
  const { scale: scale3, transform: transform2, compose: compose2 } = options;
  const fn2 = (value, theme2) => {
    var _a7;
    const _value = tokenToCSSVar(scale3, value)(theme2);
    let result = (_a7 = transform2 == null ? void 0 : transform2(_value, theme2)) != null ? _a7 : _value;
    if (compose2) {
      result = compose2(result, theme2);
    }
    return result;
  };
  return fn2;
}
var pipe = (...fns) => (v) => fns.reduce((a, b) => b(a), v);
function toConfig(scale3, transform2) {
  return (property) => {
    const result = { property, scale: scale3 };
    result.transform = createTransform({
      scale: scale3,
      transform: transform2
    });
    return result;
  };
}
var getRtl = ({ rtl, ltr }) => (theme2) => theme2.direction === "rtl" ? rtl : ltr;
function logical(options) {
  const { property, scale: scale3, transform: transform2 } = options;
  return {
    scale: scale3,
    property: getRtl(property),
    transform: scale3 ? createTransform({
      scale: scale3,
      compose: transform2
    }) : transform2
  };
}
var transformTemplate = [
  "rotate(var(--chakra-rotate, 0))",
  "scaleX(var(--chakra-scale-x, 1))",
  "scaleY(var(--chakra-scale-y, 1))",
  "skewX(var(--chakra-skew-x, 0))",
  "skewY(var(--chakra-skew-y, 0))"
];
function getTransformTemplate() {
  return [
    "translateX(var(--chakra-translate-x, 0))",
    "translateY(var(--chakra-translate-y, 0))",
    ...transformTemplate
  ].join(" ");
}
function getTransformGpuTemplate() {
  return [
    "translate3d(var(--chakra-translate-x, 0), var(--chakra-translate-y, 0), 0)",
    ...transformTemplate
  ].join(" ");
}
var filterTemplate = {
  "--chakra-blur": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-brightness": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-contrast": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-grayscale": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-hue-rotate": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-invert": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-saturate": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-sepia": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-drop-shadow": "var(--chakra-empty,/*!*/ /*!*/)",
  filter: [
    "var(--chakra-blur)",
    "var(--chakra-brightness)",
    "var(--chakra-contrast)",
    "var(--chakra-grayscale)",
    "var(--chakra-hue-rotate)",
    "var(--chakra-invert)",
    "var(--chakra-saturate)",
    "var(--chakra-sepia)",
    "var(--chakra-drop-shadow)"
  ].join(" ")
};
var backdropFilterTemplate = {
  backdropFilter: [
    "var(--chakra-backdrop-blur)",
    "var(--chakra-backdrop-brightness)",
    "var(--chakra-backdrop-contrast)",
    "var(--chakra-backdrop-grayscale)",
    "var(--chakra-backdrop-hue-rotate)",
    "var(--chakra-backdrop-invert)",
    "var(--chakra-backdrop-opacity)",
    "var(--chakra-backdrop-saturate)",
    "var(--chakra-backdrop-sepia)"
  ].join(" "),
  "--chakra-backdrop-blur": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-backdrop-brightness": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-backdrop-contrast": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-backdrop-grayscale": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-backdrop-hue-rotate": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-backdrop-invert": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-backdrop-opacity": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-backdrop-saturate": "var(--chakra-empty,/*!*/ /*!*/)",
  "--chakra-backdrop-sepia": "var(--chakra-empty,/*!*/ /*!*/)"
};
function getRingTemplate(value) {
  return {
    "--chakra-ring-offset-shadow": `var(--chakra-ring-inset) 0 0 0 var(--chakra-ring-offset-width) var(--chakra-ring-offset-color)`,
    "--chakra-ring-shadow": `var(--chakra-ring-inset) 0 0 0 calc(var(--chakra-ring-width) + var(--chakra-ring-offset-width)) var(--chakra-ring-color)`,
    "--chakra-ring-width": value,
    boxShadow: [
      `var(--chakra-ring-offset-shadow)`,
      `var(--chakra-ring-shadow)`,
      `var(--chakra-shadow, 0 0 #0000)`
    ].join(", ")
  };
}
var flexDirectionTemplate = {
  "row-reverse": {
    space: "--chakra-space-x-reverse",
    divide: "--chakra-divide-x-reverse"
  },
  "column-reverse": {
    space: "--chakra-space-y-reverse",
    divide: "--chakra-divide-y-reverse"
  }
};
var directionMap = {
  "to-t": "to top",
  "to-tr": "to top right",
  "to-r": "to right",
  "to-br": "to bottom right",
  "to-b": "to bottom",
  "to-bl": "to bottom left",
  "to-l": "to left",
  "to-tl": "to top left"
};
var valueSet = new Set(Object.values(directionMap));
var globalSet = /* @__PURE__ */ new Set(
  [
    "none",
    "-moz-initial",
    "inherit",
    "initial",
    "revert",
    "unset"
  ]
);
var trimSpace = (str) => str.trim();
function parseGradient(value, theme2) {
  if (value == null || globalSet.has(value))
    return value;
  const prevent = isCSSFunction(value) || globalSet.has(value);
  if (!prevent)
    return `url('${value}')`;
  const regex = /(^[a-z-A-Z]+)\((.*)\)/g;
  const results = regex.exec(value);
  const type = results == null ? void 0 : results[1];
  const values = results == null ? void 0 : results[2];
  if (!type || !values)
    return value;
  const _type = type.includes("-gradient") ? type : `${type}-gradient`;
  const [maybeDirection, ...stops] = values.split(",").map(trimSpace).filter(Boolean);
  if ((stops == null ? void 0 : stops.length) === 0)
    return value;
  const direction2 = maybeDirection in directionMap ? directionMap[maybeDirection] : maybeDirection;
  stops.unshift(direction2);
  const _values = stops.map((stop) => {
    if (valueSet.has(stop))
      return stop;
    const firstStop = stop.indexOf(" ");
    const [_color, _stop] = firstStop !== -1 ? [stop.substr(0, firstStop), stop.substr(firstStop + 1)] : [stop];
    const _stopOrFunc = isCSSFunction(_stop) ? _stop : _stop && _stop.split(" ");
    const key = `colors.${_color}`;
    const color22 = key in theme2.__cssMap ? theme2.__cssMap[key].varRef : _color;
    return _stopOrFunc ? [
      color22,
      ...Array.isArray(_stopOrFunc) ? _stopOrFunc : [_stopOrFunc]
    ].join(" ") : color22;
  });
  return `${_type}(${_values.join(", ")})`;
}
var isCSSFunction = (value) => {
  return typeof value === "string" && value.includes("(") && value.includes(")");
};
var gradientTransform = (value, theme2) => parseGradient(value, theme2 != null ? theme2 : {});
function isCssVar(value) {
  return /^var\(--.+\)$/.test(value);
}
var analyzeCSSValue = (value) => {
  const num = parseFloat(value.toString());
  const unit = value.toString().replace(String(num), "");
  return { unitless: !unit, value: num, unit };
};
var wrap = (str) => (value) => `${str}(${value})`;
var transformFunctions = {
  filter(value) {
    return value !== "auto" ? value : filterTemplate;
  },
  backdropFilter(value) {
    return value !== "auto" ? value : backdropFilterTemplate;
  },
  ring(value) {
    return getRingTemplate(transformFunctions.px(value));
  },
  bgClip(value) {
    return value === "text" ? { color: "transparent", backgroundClip: "text" } : { backgroundClip: value };
  },
  transform(value) {
    if (value === "auto")
      return getTransformTemplate();
    if (value === "auto-gpu")
      return getTransformGpuTemplate();
    return value;
  },
  vh(value) {
    return value === "$100vh" ? "var(--chakra-vh)" : value;
  },
  px(value) {
    if (value == null)
      return value;
    const { unitless } = analyzeCSSValue(value);
    return unitless || typeof value === "number" ? `${value}px` : value;
  },
  fraction(value) {
    return !(typeof value === "number") || value > 1 ? value : `${value * 100}%`;
  },
  float(value, theme2) {
    const map = { left: "right", right: "left" };
    return theme2.direction === "rtl" ? map[value] : value;
  },
  degree(value) {
    if (isCssVar(value) || value == null)
      return value;
    const unitless = typeof value === "string" && !value.endsWith("deg");
    return typeof value === "number" || unitless ? `${value}deg` : value;
  },
  gradient: gradientTransform,
  blur: wrap("blur"),
  opacity: wrap("opacity"),
  brightness: wrap("brightness"),
  contrast: wrap("contrast"),
  dropShadow: wrap("drop-shadow"),
  grayscale: wrap("grayscale"),
  hueRotate: (value) => wrap("hue-rotate")(transformFunctions.degree(value)),
  invert: wrap("invert"),
  saturate: wrap("saturate"),
  sepia: wrap("sepia"),
  bgImage(value) {
    if (value == null)
      return value;
    const prevent = isCSSFunction(value) || globalSet.has(value);
    return !prevent ? `url(${value})` : value;
  },
  outline(value) {
    const isNoneOrZero = String(value) === "0" || String(value) === "none";
    return value !== null && isNoneOrZero ? { outline: "2px solid transparent", outlineOffset: "2px" } : { outline: value };
  },
  flexDirection(value) {
    var _a7;
    const { space: space2, divide: divide22 } = (_a7 = flexDirectionTemplate[value]) != null ? _a7 : {};
    const result = { flexDirection: value };
    if (space2)
      result[space2] = 1;
    if (divide22)
      result[divide22] = 1;
    return result;
  }
};
var t = {
  borderWidths: toConfig("borderWidths"),
  borderStyles: toConfig("borderStyles"),
  colors: toConfig("colors"),
  borders: toConfig("borders"),
  gradients: toConfig("gradients", transformFunctions.gradient),
  radii: toConfig("radii", transformFunctions.px),
  space: toConfig("space", pipe(transformFunctions.vh, transformFunctions.px)),
  spaceT: toConfig("space", pipe(transformFunctions.vh, transformFunctions.px)),
  degreeT(property) {
    return { property, transform: transformFunctions.degree };
  },
  prop(property, scale3, transform2) {
    return {
      property,
      scale: scale3,
      ...scale3 && {
        transform: createTransform({ scale: scale3, transform: transform2 })
      }
    };
  },
  propT(property, transform2) {
    return { property, transform: transform2 };
  },
  sizes: toConfig("sizes", pipe(transformFunctions.vh, transformFunctions.px)),
  sizesT: toConfig("sizes", pipe(transformFunctions.vh, transformFunctions.fraction)),
  shadows: toConfig("shadows"),
  logical,
  blur: toConfig("blur", transformFunctions.blur)
};
var background = {
  background: t.colors("background"),
  backgroundColor: t.colors("backgroundColor"),
  backgroundImage: t.gradients("backgroundImage"),
  backgroundSize: true,
  backgroundPosition: true,
  backgroundRepeat: true,
  backgroundAttachment: true,
  backgroundClip: { transform: transformFunctions.bgClip },
  bgSize: t.prop("backgroundSize"),
  bgPosition: t.prop("backgroundPosition"),
  bg: t.colors("background"),
  bgColor: t.colors("backgroundColor"),
  bgPos: t.prop("backgroundPosition"),
  bgRepeat: t.prop("backgroundRepeat"),
  bgAttachment: t.prop("backgroundAttachment"),
  bgGradient: t.gradients("backgroundImage"),
  bgClip: { transform: transformFunctions.bgClip }
};
Object.assign(background, {
  bgImage: background.backgroundImage,
  bgImg: background.backgroundImage
});
var border = {
  border: t.borders("border"),
  borderWidth: t.borderWidths("borderWidth"),
  borderStyle: t.borderStyles("borderStyle"),
  borderColor: t.colors("borderColor"),
  borderRadius: t.radii("borderRadius"),
  borderTop: t.borders("borderTop"),
  borderBlockStart: t.borders("borderBlockStart"),
  borderTopLeftRadius: t.radii("borderTopLeftRadius"),
  borderStartStartRadius: t.logical({
    scale: "radii",
    property: {
      ltr: "borderTopLeftRadius",
      rtl: "borderTopRightRadius"
    }
  }),
  borderEndStartRadius: t.logical({
    scale: "radii",
    property: {
      ltr: "borderBottomLeftRadius",
      rtl: "borderBottomRightRadius"
    }
  }),
  borderTopRightRadius: t.radii("borderTopRightRadius"),
  borderStartEndRadius: t.logical({
    scale: "radii",
    property: {
      ltr: "borderTopRightRadius",
      rtl: "borderTopLeftRadius"
    }
  }),
  borderEndEndRadius: t.logical({
    scale: "radii",
    property: {
      ltr: "borderBottomRightRadius",
      rtl: "borderBottomLeftRadius"
    }
  }),
  borderRight: t.borders("borderRight"),
  borderInlineEnd: t.borders("borderInlineEnd"),
  borderBottom: t.borders("borderBottom"),
  borderBlockEnd: t.borders("borderBlockEnd"),
  borderBottomLeftRadius: t.radii("borderBottomLeftRadius"),
  borderBottomRightRadius: t.radii("borderBottomRightRadius"),
  borderLeft: t.borders("borderLeft"),
  borderInlineStart: {
    property: "borderInlineStart",
    scale: "borders"
  },
  borderInlineStartRadius: t.logical({
    scale: "radii",
    property: {
      ltr: ["borderTopLeftRadius", "borderBottomLeftRadius"],
      rtl: ["borderTopRightRadius", "borderBottomRightRadius"]
    }
  }),
  borderInlineEndRadius: t.logical({
    scale: "radii",
    property: {
      ltr: ["borderTopRightRadius", "borderBottomRightRadius"],
      rtl: ["borderTopLeftRadius", "borderBottomLeftRadius"]
    }
  }),
  borderX: t.borders(["borderLeft", "borderRight"]),
  borderInline: t.borders("borderInline"),
  borderY: t.borders(["borderTop", "borderBottom"]),
  borderBlock: t.borders("borderBlock"),
  borderTopWidth: t.borderWidths("borderTopWidth"),
  borderBlockStartWidth: t.borderWidths("borderBlockStartWidth"),
  borderTopColor: t.colors("borderTopColor"),
  borderBlockStartColor: t.colors("borderBlockStartColor"),
  borderTopStyle: t.borderStyles("borderTopStyle"),
  borderBlockStartStyle: t.borderStyles("borderBlockStartStyle"),
  borderBottomWidth: t.borderWidths("borderBottomWidth"),
  borderBlockEndWidth: t.borderWidths("borderBlockEndWidth"),
  borderBottomColor: t.colors("borderBottomColor"),
  borderBlockEndColor: t.colors("borderBlockEndColor"),
  borderBottomStyle: t.borderStyles("borderBottomStyle"),
  borderBlockEndStyle: t.borderStyles("borderBlockEndStyle"),
  borderLeftWidth: t.borderWidths("borderLeftWidth"),
  borderInlineStartWidth: t.borderWidths("borderInlineStartWidth"),
  borderLeftColor: t.colors("borderLeftColor"),
  borderInlineStartColor: t.colors("borderInlineStartColor"),
  borderLeftStyle: t.borderStyles("borderLeftStyle"),
  borderInlineStartStyle: t.borderStyles("borderInlineStartStyle"),
  borderRightWidth: t.borderWidths("borderRightWidth"),
  borderInlineEndWidth: t.borderWidths("borderInlineEndWidth"),
  borderRightColor: t.colors("borderRightColor"),
  borderInlineEndColor: t.colors("borderInlineEndColor"),
  borderRightStyle: t.borderStyles("borderRightStyle"),
  borderInlineEndStyle: t.borderStyles("borderInlineEndStyle"),
  borderTopRadius: t.radii(["borderTopLeftRadius", "borderTopRightRadius"]),
  borderBottomRadius: t.radii(
    [
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  ),
  borderLeftRadius: t.radii(["borderTopLeftRadius", "borderBottomLeftRadius"]),
  borderRightRadius: t.radii(
    [
      "borderTopRightRadius",
      "borderBottomRightRadius"
    ]
  )
};
Object.assign(border, {
  rounded: border.borderRadius,
  roundedTop: border.borderTopRadius,
  roundedTopLeft: border.borderTopLeftRadius,
  roundedTopRight: border.borderTopRightRadius,
  roundedTopStart: border.borderStartStartRadius,
  roundedTopEnd: border.borderStartEndRadius,
  roundedBottom: border.borderBottomRadius,
  roundedBottomLeft: border.borderBottomLeftRadius,
  roundedBottomRight: border.borderBottomRightRadius,
  roundedBottomStart: border.borderEndStartRadius,
  roundedBottomEnd: border.borderEndEndRadius,
  roundedLeft: border.borderLeftRadius,
  roundedRight: border.borderRightRadius,
  roundedStart: border.borderInlineStartRadius,
  roundedEnd: border.borderInlineEndRadius,
  borderStart: border.borderInlineStart,
  borderEnd: border.borderInlineEnd,
  borderTopStartRadius: border.borderStartStartRadius,
  borderTopEndRadius: border.borderStartEndRadius,
  borderBottomStartRadius: border.borderEndStartRadius,
  borderBottomEndRadius: border.borderEndEndRadius,
  borderStartRadius: border.borderInlineStartRadius,
  borderEndRadius: border.borderInlineEndRadius,
  borderStartWidth: border.borderInlineStartWidth,
  borderEndWidth: border.borderInlineEndWidth,
  borderStartColor: border.borderInlineStartColor,
  borderEndColor: border.borderInlineEndColor,
  borderStartStyle: border.borderInlineStartStyle,
  borderEndStyle: border.borderInlineEndStyle
});
var color = {
  color: t.colors("color"),
  textColor: t.colors("color"),
  fill: t.colors("fill"),
  stroke: t.colors("stroke")
};
var effect = {
  boxShadow: t.shadows("boxShadow"),
  mixBlendMode: true,
  blendMode: t.prop("mixBlendMode"),
  backgroundBlendMode: true,
  bgBlendMode: t.prop("backgroundBlendMode"),
  opacity: true
};
Object.assign(effect, {
  shadow: effect.boxShadow
});
var filter = {
  filter: { transform: transformFunctions.filter },
  blur: t.blur("--chakra-blur"),
  brightness: t.propT("--chakra-brightness", transformFunctions.brightness),
  contrast: t.propT("--chakra-contrast", transformFunctions.contrast),
  hueRotate: t.propT("--chakra-hue-rotate", transformFunctions.hueRotate),
  invert: t.propT("--chakra-invert", transformFunctions.invert),
  saturate: t.propT("--chakra-saturate", transformFunctions.saturate),
  dropShadow: t.propT("--chakra-drop-shadow", transformFunctions.dropShadow),
  backdropFilter: { transform: transformFunctions.backdropFilter },
  backdropBlur: t.blur("--chakra-backdrop-blur"),
  backdropBrightness: t.propT(
    "--chakra-backdrop-brightness",
    transformFunctions.brightness
  ),
  backdropContrast: t.propT("--chakra-backdrop-contrast", transformFunctions.contrast),
  backdropHueRotate: t.propT(
    "--chakra-backdrop-hue-rotate",
    transformFunctions.hueRotate
  ),
  backdropInvert: t.propT("--chakra-backdrop-invert", transformFunctions.invert),
  backdropSaturate: t.propT("--chakra-backdrop-saturate", transformFunctions.saturate)
};
var flexbox = {
  alignItems: true,
  alignContent: true,
  justifyItems: true,
  justifyContent: true,
  flexWrap: true,
  flexDirection: { transform: transformFunctions.flexDirection },
  flex: true,
  flexFlow: true,
  flexGrow: true,
  flexShrink: true,
  flexBasis: t.sizes("flexBasis"),
  justifySelf: true,
  alignSelf: true,
  order: true,
  placeItems: true,
  placeContent: true,
  placeSelf: true,
  gap: t.space("gap"),
  rowGap: t.space("rowGap"),
  columnGap: t.space("columnGap")
};
Object.assign(flexbox, {
  flexDir: flexbox.flexDirection
});
var grid = {
  gridGap: t.space("gridGap"),
  gridColumnGap: t.space("gridColumnGap"),
  gridRowGap: t.space("gridRowGap"),
  gridColumn: true,
  gridRow: true,
  gridAutoFlow: true,
  gridAutoColumns: true,
  gridColumnStart: true,
  gridColumnEnd: true,
  gridRowStart: true,
  gridRowEnd: true,
  gridAutoRows: true,
  gridTemplate: true,
  gridTemplateColumns: true,
  gridTemplateRows: true,
  gridTemplateAreas: true,
  gridArea: true
};
var interactivity = {
  appearance: true,
  cursor: true,
  resize: true,
  userSelect: true,
  pointerEvents: true,
  outline: { transform: transformFunctions.outline },
  outlineOffset: true,
  outlineColor: t.colors("outlineColor")
};
var layout = {
  width: t.sizesT("width"),
  inlineSize: t.sizesT("inlineSize"),
  height: t.sizes("height"),
  blockSize: t.sizes("blockSize"),
  boxSize: t.sizes(["width", "height"]),
  minWidth: t.sizes("minWidth"),
  minInlineSize: t.sizes("minInlineSize"),
  minHeight: t.sizes("minHeight"),
  minBlockSize: t.sizes("minBlockSize"),
  maxWidth: t.sizes("maxWidth"),
  maxInlineSize: t.sizes("maxInlineSize"),
  maxHeight: t.sizes("maxHeight"),
  maxBlockSize: t.sizes("maxBlockSize"),
  overflow: true,
  overflowX: true,
  overflowY: true,
  overscrollBehavior: true,
  overscrollBehaviorX: true,
  overscrollBehaviorY: true,
  display: true,
  aspectRatio: true,
  hideFrom: {
    scale: "breakpoints",
    transform: (value, theme2) => {
      var _a7, _b5, _c3;
      const breakpoint = (_c3 = (_b5 = (_a7 = theme2.__breakpoints) == null ? void 0 : _a7.get(value)) == null ? void 0 : _b5.minW) != null ? _c3 : value;
      const mq = `@media screen and (min-width: ${breakpoint})`;
      return { [mq]: { display: "none" } };
    }
  },
  hideBelow: {
    scale: "breakpoints",
    transform: (value, theme2) => {
      var _a7, _b5, _c3;
      const breakpoint = (_c3 = (_b5 = (_a7 = theme2.__breakpoints) == null ? void 0 : _a7.get(value)) == null ? void 0 : _b5._minW) != null ? _c3 : value;
      const mq = `@media screen and (max-width: ${breakpoint})`;
      return { [mq]: { display: "none" } };
    }
  },
  verticalAlign: true,
  boxSizing: true,
  boxDecorationBreak: true,
  float: t.propT("float", transformFunctions.float),
  objectFit: true,
  objectPosition: true,
  visibility: true,
  isolation: true
};
Object.assign(layout, {
  w: layout.width,
  h: layout.height,
  minW: layout.minWidth,
  maxW: layout.maxWidth,
  minH: layout.minHeight,
  maxH: layout.maxHeight,
  overscroll: layout.overscrollBehavior,
  overscrollX: layout.overscrollBehaviorX,
  overscrollY: layout.overscrollBehaviorY
});
var list = {
  listStyleType: true,
  listStylePosition: true,
  listStylePos: t.prop("listStylePosition"),
  listStyleImage: true,
  listStyleImg: t.prop("listStyleImage")
};
function get(obj, path, fallback, index2) {
  const key = typeof path === "string" ? path.split(".") : [path];
  for (index2 = 0; index2 < key.length; index2 += 1) {
    if (!obj)
      break;
    obj = obj[key[index2]];
  }
  return obj === void 0 ? fallback : obj;
}
var memoize2 = (fn2) => {
  const cache = /* @__PURE__ */ new WeakMap();
  const memoizedFn = (obj, path, fallback, index2) => {
    if (typeof obj === "undefined") {
      return fn2(obj, path, fallback);
    }
    if (!cache.has(obj)) {
      cache.set(obj, /* @__PURE__ */ new Map());
    }
    const map = cache.get(obj);
    if (map.has(path)) {
      return map.get(path);
    }
    const value = fn2(obj, path, fallback, index2);
    map.set(path, value);
    return value;
  };
  return memoizedFn;
};
var memoizedGet = memoize2(get);
var srOnly = {
  border: "0px",
  clip: "rect(0, 0, 0, 0)",
  width: "1px",
  height: "1px",
  margin: "-1px",
  padding: "0px",
  overflow: "hidden",
  whiteSpace: "nowrap",
  position: "absolute"
};
var srFocusable = {
  position: "static",
  width: "auto",
  height: "auto",
  clip: "auto",
  padding: "0",
  margin: "0",
  overflow: "visible",
  whiteSpace: "normal"
};
var getWithPriority = (theme2, key, styles2) => {
  const result = {};
  const obj = memoizedGet(theme2, key, {});
  for (const prop in obj) {
    const isInStyles = prop in styles2 && styles2[prop] != null;
    if (!isInStyles)
      result[prop] = obj[prop];
  }
  return result;
};
var others = {
  srOnly: {
    transform(value) {
      if (value === true)
        return srOnly;
      if (value === "focusable")
        return srFocusable;
      return {};
    }
  },
  layerStyle: {
    processResult: true,
    transform: (value, theme2, styles2) => getWithPriority(theme2, `layerStyles.${value}`, styles2)
  },
  textStyle: {
    processResult: true,
    transform: (value, theme2, styles2) => getWithPriority(theme2, `textStyles.${value}`, styles2)
  },
  apply: {
    processResult: true,
    transform: (value, theme2, styles2) => getWithPriority(theme2, value, styles2)
  }
};
var position = {
  position: true,
  pos: t.prop("position"),
  zIndex: t.prop("zIndex", "zIndices"),
  inset: t.spaceT("inset"),
  insetX: t.spaceT(["left", "right"]),
  insetInline: t.spaceT("insetInline"),
  insetY: t.spaceT(["top", "bottom"]),
  insetBlock: t.spaceT("insetBlock"),
  top: t.spaceT("top"),
  insetBlockStart: t.spaceT("insetBlockStart"),
  bottom: t.spaceT("bottom"),
  insetBlockEnd: t.spaceT("insetBlockEnd"),
  left: t.spaceT("left"),
  insetInlineStart: t.logical({
    scale: "space",
    property: { ltr: "left", rtl: "right" }
  }),
  right: t.spaceT("right"),
  insetInlineEnd: t.logical({
    scale: "space",
    property: { ltr: "right", rtl: "left" }
  })
};
Object.assign(position, {
  insetStart: position.insetInlineStart,
  insetEnd: position.insetInlineEnd
});
var ring = {
  ring: { transform: transformFunctions.ring },
  ringColor: t.colors("--chakra-ring-color"),
  ringOffset: t.prop("--chakra-ring-offset-width"),
  ringOffsetColor: t.colors("--chakra-ring-offset-color"),
  ringInset: t.prop("--chakra-ring-inset")
};
var space = {
  margin: t.spaceT("margin"),
  marginTop: t.spaceT("marginTop"),
  marginBlockStart: t.spaceT("marginBlockStart"),
  marginRight: t.spaceT("marginRight"),
  marginInlineEnd: t.spaceT("marginInlineEnd"),
  marginBottom: t.spaceT("marginBottom"),
  marginBlockEnd: t.spaceT("marginBlockEnd"),
  marginLeft: t.spaceT("marginLeft"),
  marginInlineStart: t.spaceT("marginInlineStart"),
  marginX: t.spaceT(["marginInlineStart", "marginInlineEnd"]),
  marginInline: t.spaceT("marginInline"),
  marginY: t.spaceT(["marginTop", "marginBottom"]),
  marginBlock: t.spaceT("marginBlock"),
  padding: t.space("padding"),
  paddingTop: t.space("paddingTop"),
  paddingBlockStart: t.space("paddingBlockStart"),
  paddingRight: t.space("paddingRight"),
  paddingBottom: t.space("paddingBottom"),
  paddingBlockEnd: t.space("paddingBlockEnd"),
  paddingLeft: t.space("paddingLeft"),
  paddingInlineStart: t.space("paddingInlineStart"),
  paddingInlineEnd: t.space("paddingInlineEnd"),
  paddingX: t.space(["paddingInlineStart", "paddingInlineEnd"]),
  paddingInline: t.space("paddingInline"),
  paddingY: t.space(["paddingTop", "paddingBottom"]),
  paddingBlock: t.space("paddingBlock")
};
Object.assign(space, {
  m: space.margin,
  mt: space.marginTop,
  mr: space.marginRight,
  me: space.marginInlineEnd,
  marginEnd: space.marginInlineEnd,
  mb: space.marginBottom,
  ml: space.marginLeft,
  ms: space.marginInlineStart,
  marginStart: space.marginInlineStart,
  mx: space.marginX,
  my: space.marginY,
  p: space.padding,
  pt: space.paddingTop,
  py: space.paddingY,
  px: space.paddingX,
  pb: space.paddingBottom,
  pl: space.paddingLeft,
  ps: space.paddingInlineStart,
  paddingStart: space.paddingInlineStart,
  pr: space.paddingRight,
  pe: space.paddingInlineEnd,
  paddingEnd: space.paddingInlineEnd
});
var textDecoration = {
  textDecorationColor: t.colors("textDecorationColor"),
  textDecoration: true,
  textDecor: { property: "textDecoration" },
  textDecorationLine: true,
  textDecorationStyle: true,
  textDecorationThickness: true,
  textUnderlineOffset: true,
  textShadow: t.shadows("textShadow")
};
var transform = {
  clipPath: true,
  transform: t.propT("transform", transformFunctions.transform),
  transformOrigin: true,
  translateX: t.spaceT("--chakra-translate-x"),
  translateY: t.spaceT("--chakra-translate-y"),
  skewX: t.degreeT("--chakra-skew-x"),
  skewY: t.degreeT("--chakra-skew-y"),
  scaleX: t.prop("--chakra-scale-x"),
  scaleY: t.prop("--chakra-scale-y"),
  scale: t.prop(["--chakra-scale-x", "--chakra-scale-y"]),
  rotate: t.degreeT("--chakra-rotate")
};
var transition = {
  transition: true,
  transitionDelay: true,
  animation: true,
  willChange: true,
  transitionDuration: t.prop("transitionDuration", "transition.duration"),
  transitionProperty: t.prop("transitionProperty", "transition.property"),
  transitionTimingFunction: t.prop(
    "transitionTimingFunction",
    "transition.easing"
  )
};
var typography = {
  fontFamily: t.prop("fontFamily", "fonts"),
  fontSize: t.prop("fontSize", "fontSizes", transformFunctions.px),
  fontWeight: t.prop("fontWeight", "fontWeights"),
  lineHeight: t.prop("lineHeight", "lineHeights"),
  letterSpacing: t.prop("letterSpacing", "letterSpacings"),
  textAlign: true,
  fontStyle: true,
  textIndent: true,
  wordBreak: true,
  overflowWrap: true,
  textOverflow: true,
  textTransform: true,
  whiteSpace: true,
  isTruncated: {
    transform(value) {
      if (value === true) {
        return {
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        };
      }
    }
  },
  noOfLines: {
    static: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitBoxOrient: "vertical",
      //@ts-ignore
      WebkitLineClamp: "var(--chakra-line-clamp)"
    },
    property: "--chakra-line-clamp"
  }
};
var scroll = {
  scrollBehavior: true,
  scrollSnapAlign: true,
  scrollSnapStop: true,
  scrollSnapType: true,
  // scroll margin
  scrollMargin: t.spaceT("scrollMargin"),
  scrollMarginTop: t.spaceT("scrollMarginTop"),
  scrollMarginBottom: t.spaceT("scrollMarginBottom"),
  scrollMarginLeft: t.spaceT("scrollMarginLeft"),
  scrollMarginRight: t.spaceT("scrollMarginRight"),
  scrollMarginX: t.spaceT(["scrollMarginLeft", "scrollMarginRight"]),
  scrollMarginY: t.spaceT(["scrollMarginTop", "scrollMarginBottom"]),
  // scroll padding
  scrollPadding: t.spaceT("scrollPadding"),
  scrollPaddingTop: t.spaceT("scrollPaddingTop"),
  scrollPaddingBottom: t.spaceT("scrollPaddingBottom"),
  scrollPaddingLeft: t.spaceT("scrollPaddingLeft"),
  scrollPaddingRight: t.spaceT("scrollPaddingRight"),
  scrollPaddingX: t.spaceT(["scrollPaddingLeft", "scrollPaddingRight"]),
  scrollPaddingY: t.spaceT(["scrollPaddingTop", "scrollPaddingBottom"])
};
function resolveReference(operand) {
  if (isObject(operand) && operand.reference) {
    return operand.reference;
  }
  return String(operand);
}
var toExpression = (operator, ...operands) => operands.map(resolveReference).join(` ${operator} `).replace(/calc/g, "");
var add = (...operands) => `calc(${toExpression("+", ...operands)})`;
var subtract = (...operands) => `calc(${toExpression("-", ...operands)})`;
var multiply = (...operands) => `calc(${toExpression("*", ...operands)})`;
var divide = (...operands) => `calc(${toExpression("/", ...operands)})`;
var negate = (x) => {
  const value = resolveReference(x);
  if (value != null && !Number.isNaN(parseFloat(value))) {
    return String(value).startsWith("-") ? String(value).slice(1) : `-${value}`;
  }
  return multiply(value, -1);
};
var calc = Object.assign(
  (x) => ({
    add: (...operands) => calc(add(x, ...operands)),
    subtract: (...operands) => calc(subtract(x, ...operands)),
    multiply: (...operands) => calc(multiply(x, ...operands)),
    divide: (...operands) => calc(divide(x, ...operands)),
    negate: () => calc(negate(x)),
    toString: () => x.toString()
  }),
  {
    add,
    subtract,
    multiply,
    divide,
    negate
  }
);
function replaceWhiteSpace(value, replaceValue = "-") {
  return value.replace(/\s+/g, replaceValue);
}
function escape(value) {
  const valueStr = replaceWhiteSpace(value.toString());
  return escapeSymbol(escapeDot(valueStr));
}
function escapeDot(value) {
  if (value.includes("\\."))
    return value;
  const isDecimal2 = !Number.isInteger(parseFloat(value.toString()));
  return isDecimal2 ? value.replace(".", `\\.`) : value;
}
function escapeSymbol(value) {
  return value.replace(/[!-,/:-@[-^`{-~]/g, "\\$&");
}
function addPrefix(value, prefix = "") {
  return [prefix, value].filter(Boolean).join("-");
}
function toVarReference(name, fallback) {
  return `var(${name}${fallback ? `, ${fallback}` : ""})`;
}
function toVarDefinition(value, prefix = "") {
  return escape(`--${addPrefix(value, prefix)}`);
}
function cssVar(name, fallback, cssVarPrefix) {
  const cssVariable = toVarDefinition(name, cssVarPrefix);
  return {
    variable: cssVariable,
    reference: toVarReference(cssVariable, fallback)
  };
}
function defineCssVars(scope, keys2) {
  const vars2 = {};
  for (const key of keys2) {
    if (Array.isArray(key)) {
      const [name, fallback] = key;
      vars2[name] = cssVar(`${scope}-${name}`, fallback);
      continue;
    }
    vars2[key] = cssVar(`${scope}-${key}`);
  }
  return vars2;
}
function getLastItem(array) {
  const length = array == null ? 0 : array.length;
  return length ? array[length - 1] : void 0;
}
function analyzeCSSValue2(value) {
  const num = parseFloat(value.toString());
  const unit = value.toString().replace(String(num), "");
  return { unitless: !unit, value: num, unit };
}
function px(value) {
  if (value == null)
    return value;
  const { unitless } = analyzeCSSValue2(value);
  return unitless || typeof value === "number" ? `${value}px` : value;
}
var sortByBreakpointValue = (a, b) => parseInt(a[1], 10) > parseInt(b[1], 10) ? 1 : -1;
var sortBps = (breakpoints2) => Object.fromEntries(Object.entries(breakpoints2).sort(sortByBreakpointValue));
function normalize(breakpoints2) {
  const sorted = sortBps(breakpoints2);
  return Object.assign(Object.values(sorted), sorted);
}
function keys(breakpoints2) {
  const value = Object.keys(sortBps(breakpoints2));
  return new Set(value);
}
function subtract2(value) {
  var _a7;
  if (!value)
    return value;
  value = (_a7 = px(value)) != null ? _a7 : value;
  const OFFSET = -0.02;
  return typeof value === "number" ? `${value + OFFSET}` : value.replace(/(\d+\.?\d*)/u, (m) => `${parseFloat(m) + OFFSET}`);
}
function toMediaQueryString(min2, max2) {
  const query = ["@media screen"];
  if (min2)
    query.push("and", `(min-width: ${px(min2)})`);
  if (max2)
    query.push("and", `(max-width: ${px(max2)})`);
  return query.join(" ");
}
function analyzeBreakpoints(breakpoints2) {
  var _a7;
  if (!breakpoints2)
    return null;
  breakpoints2.base = (_a7 = breakpoints2.base) != null ? _a7 : "0px";
  const normalized = normalize(breakpoints2);
  const queries = Object.entries(breakpoints2).sort(sortByBreakpointValue).map(([breakpoint, minW], index2, entry) => {
    var _a24;
    let [, maxW] = (_a24 = entry[index2 + 1]) != null ? _a24 : [];
    maxW = parseFloat(maxW) > 0 ? subtract2(maxW) : void 0;
    return {
      _minW: subtract2(minW),
      breakpoint,
      minW,
      maxW,
      maxWQuery: toMediaQueryString(null, maxW),
      minWQuery: toMediaQueryString(minW),
      minMaxQuery: toMediaQueryString(minW, maxW)
    };
  });
  const _keys = keys(breakpoints2);
  const _keysArr = Array.from(_keys.values());
  return {
    keys: _keys,
    normalized,
    isResponsive(test2) {
      const keys2 = Object.keys(test2);
      return keys2.length > 0 && keys2.every((key) => _keys.has(key));
    },
    asObject: sortBps(breakpoints2),
    asArray: normalize(breakpoints2),
    details: queries,
    get(key) {
      return queries.find((q) => q.breakpoint === key);
    },
    media: [
      null,
      ...normalized.map((minW) => toMediaQueryString(minW)).slice(1)
    ],
    /**
     * Converts the object responsive syntax to array syntax
     *
     * @example
     * toArrayValue({ base: 1, sm: 2, md: 3 }) // => [1, 2, 3]
     */
    toArrayValue(test2) {
      if (!isObject(test2)) {
        throw new Error("toArrayValue: value must be an object");
      }
      const result = _keysArr.map((bp) => {
        var _a24;
        return (_a24 = test2[bp]) != null ? _a24 : null;
      });
      while (getLastItem(result) === null) {
        result.pop();
      }
      return result;
    },
    /**
     * Converts the array responsive syntax to object syntax
     *
     * @example
     * toObjectValue([1, 2, 3]) // => { base: 1, sm: 2, md: 3 }
     */
    toObjectValue(test2) {
      if (!Array.isArray(test2)) {
        throw new Error("toObjectValue: value must be an array");
      }
      return test2.reduce((acc, value, index2) => {
        const key = _keysArr[index2];
        if (key != null && value != null)
          acc[key] = value;
        return acc;
      }, {});
    }
  };
}
var state = {
  hover: (str, post) => `${str}:hover ${post}, ${str}[data-hover] ${post}`,
  focus: (str, post) => `${str}:focus ${post}, ${str}[data-focus] ${post}`,
  focusVisible: (str, post) => `${str}:focus-visible ${post}`,
  focusWithin: (str, post) => `${str}:focus-within ${post}`,
  active: (str, post) => `${str}:active ${post}, ${str}[data-active] ${post}`,
  disabled: (str, post) => `${str}:disabled ${post}, ${str}[data-disabled] ${post}`,
  invalid: (str, post) => `${str}:invalid ${post}, ${str}[data-invalid] ${post}`,
  checked: (str, post) => `${str}:checked ${post}, ${str}[data-checked] ${post}`,
  indeterminate: (str, post) => `${str}:indeterminate ${post}, ${str}[aria-checked=mixed] ${post}, ${str}[data-indeterminate] ${post}`,
  readOnly: (str, post) => `${str}:read-only ${post}, ${str}[readonly] ${post}, ${str}[data-read-only] ${post}`,
  expanded: (str, post) => `${str}:read-only ${post}, ${str}[aria-expanded=true] ${post}, ${str}[data-expanded] ${post}`,
  placeholderShown: (str, post) => `${str}:placeholder-shown ${post}`
};
var toGroup = (fn2) => merge((v) => fn2(v, "&"), "[role=group]", "[data-group]", ".group");
var toPeer = (fn2) => merge((v) => fn2(v, "~ &"), "[data-peer]", ".peer");
var merge = (fn2, ...selectors) => selectors.map(fn2).join(", ");
var pseudoSelectors = {
  /**
   * Styles for CSS selector `&:hover`
   */
  _hover: "&:hover, &[data-hover]",
  /**
   * Styles for CSS Selector `&:active`
   */
  _active: "&:active, &[data-active]",
  /**
   * Styles for CSS selector `&:focus`
   *
   */
  _focus: "&:focus, &[data-focus]",
  /**
   * Styles for the highlighted state.
   */
  _highlighted: "&[data-highlighted]",
  /**
   * Styles to apply when a child of this element has received focus
   * - CSS Selector `&:focus-within`
   */
  _focusWithin: "&:focus-within",
  /**
   * Styles to apply when this element has received focus via tabbing
   * - CSS Selector `&:focus-visible`
   */
  _focusVisible: "&:focus-visible, &[data-focus-visible]",
  /**
   * Styles to apply when this element is disabled. The passed styles are applied to these CSS selectors:
   * - `&[aria-disabled=true]`
   * - `&:disabled`
   * - `&[data-disabled]`
   * - `&[disabled]`
   */
  _disabled: "&:disabled, &[disabled], &[aria-disabled=true], &[data-disabled]",
  /**
   * Styles for CSS Selector `&:readonly`
   */
  _readOnly: "&[aria-readonly=true], &[readonly], &[data-readonly]",
  /**
   * Styles for CSS selector `&::before`
   *
   * NOTE:When using this, ensure the `content` is wrapped in a backtick.
   * @example
   * ```jsx
   * <Box _before={{content:`""` }}/>
   * ```
   */
  _before: "&::before",
  /**
   * Styles for CSS selector `&::after`
   *
   * NOTE:When using this, ensure the `content` is wrapped in a backtick.
   * @example
   * ```jsx
   * <Box _after={{content:`""` }}/>
   * ```
   */
  _after: "&::after",
  /**
   * Styles for CSS selector `&:empty`
   */
  _empty: "&:empty",
  /**
   * Styles to apply when the ARIA attribute `aria-expanded` is `true`
   * - CSS selector `&[aria-expanded=true]`
   */
  _expanded: "&[aria-expanded=true], &[data-expanded]",
  /**
   * Styles to apply when the ARIA attribute `aria-checked` is `true`
   * - CSS selector `&[aria-checked=true]`
   */
  _checked: "&[aria-checked=true], &[data-checked]",
  /**
   * Styles to apply when the ARIA attribute `aria-grabbed` is `true`
   * - CSS selector `&[aria-grabbed=true]`
   */
  _grabbed: "&[aria-grabbed=true], &[data-grabbed]",
  /**
   * Styles for CSS Selector `&[aria-pressed=true]`
   * Typically used to style the current "pressed" state of toggle buttons
   */
  _pressed: "&[aria-pressed=true], &[data-pressed]",
  /**
   * Styles to apply when the ARIA attribute `aria-invalid` is `true`
   * - CSS selector `&[aria-invalid=true]`
   */
  _invalid: "&[aria-invalid=true], &[data-invalid]",
  /**
   * Styles for the valid state
   * - CSS selector `&[data-valid], &[data-state=valid]`
   */
  _valid: "&[data-valid], &[data-state=valid]",
  /**
   * Styles for CSS Selector `&[aria-busy=true]` or `&[data-loading=true]`.
   * Useful for styling loading states
   */
  _loading: "&[data-loading], &[aria-busy=true]",
  /**
   * Styles to apply when the ARIA attribute `aria-selected` is `true`
   *
   * - CSS selector `&[aria-selected=true]`
   */
  _selected: "&[aria-selected=true], &[data-selected]",
  /**
   * Styles for CSS Selector `[hidden=true]`
   */
  _hidden: "&[hidden], &[data-hidden]",
  /**
   * Styles for CSS Selector `&:-webkit-autofill`
   */
  _autofill: "&:-webkit-autofill",
  /**
   * Styles for CSS Selector `&:nth-child(even)`
   */
  _even: "&:nth-of-type(even)",
  /**
   * Styles for CSS Selector `&:nth-child(odd)`
   */
  _odd: "&:nth-of-type(odd)",
  /**
   * Styles for CSS Selector `&:first-of-type`
   */
  _first: "&:first-of-type",
  /**
   * Styles for CSS selector `&::first-letter`
   *
   * NOTE: This selector is only applied for block-level elements and not preceded by an image or table.
   * @example
   * ```jsx
   * <Text _firstLetter={{ textDecoration: 'underline' }}>Once upon a time</Text>
   * ```
   */
  _firstLetter: "&::first-letter",
  /**
   * Styles for CSS Selector `&:last-of-type`
   */
  _last: "&:last-of-type",
  /**
   * Styles for CSS Selector `&:not(:first-of-type)`
   */
  _notFirst: "&:not(:first-of-type)",
  /**
   * Styles for CSS Selector `&:not(:last-of-type)`
   */
  _notLast: "&:not(:last-of-type)",
  /**
   * Styles for CSS Selector `&:visited`
   */
  _visited: "&:visited",
  /**
   * Used to style the active link in a navigation
   * Styles for CSS Selector `&[aria-current=page]`
   */
  _activeLink: "&[aria-current=page]",
  /**
   * Used to style the current step within a process
   * Styles for CSS Selector `&[aria-current=step]`
   */
  _activeStep: "&[aria-current=step]",
  /**
   * Styles to apply when the ARIA attribute `aria-checked` is `mixed`
   * - CSS selector `&[aria-checked=mixed]`
   */
  _indeterminate: "&:indeterminate, &[aria-checked=mixed], &[data-indeterminate]",
  /**
   * Styles to apply when a parent element with `.group`, `data-group` or `role=group` is hovered
   */
  _groupHover: toGroup(state.hover),
  /**
   * Styles to apply when a sibling element with `.peer` or `data-peer` is hovered
   */
  _peerHover: toPeer(state.hover),
  /**
   * Styles to apply when a parent element with `.group`, `data-group` or `role=group` is focused
   */
  _groupFocus: toGroup(state.focus),
  /**
   * Styles to apply when a sibling element with `.peer` or `data-peer` is focused
   */
  _peerFocus: toPeer(state.focus),
  /**
   * Styles to apply when a parent element with `.group`, `data-group` or `role=group` has visible focus
   */
  _groupFocusVisible: toGroup(state.focusVisible),
  /**
   * Styles to apply when a sibling element with `.peer`or `data-peer` has visible focus
   */
  _peerFocusVisible: toPeer(state.focusVisible),
  /**
   * Styles to apply when a parent element with `.group`, `data-group` or `role=group` is active
   */
  _groupActive: toGroup(state.active),
  /**
   * Styles to apply when a sibling element with `.peer` or `data-peer` is active
   */
  _peerActive: toPeer(state.active),
  /**
   * Styles to apply when a parent element with `.group`, `data-group` or `role=group` is disabled
   */
  _groupDisabled: toGroup(state.disabled),
  /**
   *  Styles to apply when a sibling element with `.peer` or `data-peer` is disabled
   */
  _peerDisabled: toPeer(state.disabled),
  /**
   *  Styles to apply when a parent element with `.group`, `data-group` or `role=group` is invalid
   */
  _groupInvalid: toGroup(state.invalid),
  /**
   *  Styles to apply when a sibling element with `.peer` or `data-peer` is invalid
   */
  _peerInvalid: toPeer(state.invalid),
  /**
   * Styles to apply when a parent element with `.group`, `data-group` or `role=group` is checked
   */
  _groupChecked: toGroup(state.checked),
  /**
   * Styles to apply when a sibling element with `.peer` or `data-peer` is checked
   */
  _peerChecked: toPeer(state.checked),
  /**
   *  Styles to apply when a parent element with `.group`, `data-group` or `role=group` has focus within
   */
  _groupFocusWithin: toGroup(state.focusWithin),
  /**
   *  Styles to apply when a sibling element with `.peer` or `data-peer` has focus within
   */
  _peerFocusWithin: toPeer(state.focusWithin),
  /**
   * Styles to apply when a sibling element with `.peer` or `data-peer` has placeholder shown
   */
  _peerPlaceholderShown: toPeer(state.placeholderShown),
  /**
   * Styles for CSS Selector `&::placeholder`.
   */
  _placeholder: "&::placeholder",
  /**
   * Styles for CSS Selector `&:placeholder-shown`.
   */
  _placeholderShown: "&:placeholder-shown",
  /**
   * Styles for CSS Selector `&:fullscreen`.
   */
  _fullScreen: "&:fullscreen",
  /**
   * Styles for CSS Selector `&::selection`
   */
  _selection: "&::selection",
  /**
   * Styles for CSS Selector `[dir=rtl] &`
   * It is applied when a parent element or this element has `dir="rtl"`
   */
  _rtl: "[dir=rtl] &, &[dir=rtl]",
  /**
   * Styles for CSS Selector `[dir=ltr] &`
   * It is applied when a parent element or this element has `dir="ltr"`
   */
  _ltr: "[dir=ltr] &, &[dir=ltr]",
  /**
   * Styles for CSS Selector `@media (prefers-color-scheme: dark)`
   * It is used when the user has requested the system use a light or dark color theme.
   */
  _mediaDark: "@media (prefers-color-scheme: dark)",
  /**
   * Styles for CSS Selector `@media (prefers-reduced-motion: reduce)`
   * It is used when the user has requested the system to reduce the amount of animations.
   */
  _mediaReduceMotion: "@media (prefers-reduced-motion: reduce)",
  /**
   * Styles for when `data-theme` is applied to any parent of
   * this component or element.
   */
  _dark: ".chakra-ui-dark &:not([data-theme]),[data-theme=dark] &:not([data-theme]),&[data-theme=dark]",
  /**
   * Styles for when `data-theme` is applied to any parent of
   * this component or element.
   */
  _light: ".chakra-ui-light &:not([data-theme]),[data-theme=light] &:not([data-theme]),&[data-theme=light]",
  /**
   * Styles for the CSS Selector `&[data-orientation=horizontal]`
   */
  _horizontal: "&[data-orientation=horizontal]",
  /**
   * Styles for the CSS Selector `&[data-orientation=vertical]`
   */
  _vertical: "&[data-orientation=vertical]"
};
var pseudoPropNames = Object.keys(
  pseudoSelectors
);
function tokenToCssVar(token, prefix) {
  return cssVar(String(token).replace(/\./g, "-"), void 0, prefix);
}
function createThemeVars(flatTokens, options) {
  let cssVars2 = {};
  const cssMap = {};
  for (const [token, tokenValue] of Object.entries(flatTokens)) {
    const { isSemantic, value } = tokenValue;
    const { variable, reference: reference2 } = tokenToCssVar(token, options == null ? void 0 : options.cssVarPrefix);
    if (!isSemantic) {
      if (token.startsWith("space")) {
        const keys2 = token.split(".");
        const [firstKey, ...referenceKeys] = keys2;
        const negativeLookupKey = `${firstKey}.-${referenceKeys.join(".")}`;
        const negativeValue = calc.negate(value);
        const negatedReference = calc.negate(reference2);
        cssMap[negativeLookupKey] = {
          value: negativeValue,
          var: variable,
          varRef: negatedReference
        };
      }
      cssVars2[variable] = value;
      cssMap[token] = {
        value,
        var: variable,
        varRef: reference2
      };
      continue;
    }
    const lookupToken = (maybeToken) => {
      const scale3 = String(token).split(".")[0];
      const withScale = [scale3, maybeToken].join(".");
      const resolvedTokenValue = flatTokens[withScale];
      if (!resolvedTokenValue)
        return maybeToken;
      const { reference: reference22 } = tokenToCssVar(withScale, options == null ? void 0 : options.cssVarPrefix);
      return reference22;
    };
    const normalizedValue = isObject(value) ? value : { default: value };
    cssVars2 = (0, import_lodash.default)(
      cssVars2,
      Object.entries(normalizedValue).reduce(
        (acc, [conditionAlias, conditionValue]) => {
          var _a7, _b5;
          if (!conditionValue)
            return acc;
          const tokenReference = lookupToken(`${conditionValue}`);
          if (conditionAlias === "default") {
            acc[variable] = tokenReference;
            return acc;
          }
          const conditionSelector = (_b5 = (_a7 = pseudoSelectors) == null ? void 0 : _a7[conditionAlias]) != null ? _b5 : conditionAlias;
          acc[conditionSelector] = { [variable]: tokenReference };
          return acc;
        },
        {}
      )
    );
    cssMap[token] = {
      value: reference2,
      var: variable,
      varRef: reference2
    };
  }
  return {
    cssVars: cssVars2,
    cssMap
  };
}
function omit(object, keysToOmit = []) {
  const clone = Object.assign({}, object);
  for (const key of keysToOmit) {
    if (key in clone) {
      delete clone[key];
    }
  }
  return clone;
}
function pick(object, keysToPick) {
  const result = {};
  for (const key of keysToPick) {
    if (key in object) {
      result[key] = object[key];
    }
  }
  return result;
}
function isObject5(value) {
  return typeof value === "object" && value != null && !Array.isArray(value);
}
function walkObject(target, predicate, options = {}) {
  const { stop, getKey } = options;
  function inner(value, path = []) {
    var _a7;
    if (isObject5(value) || Array.isArray(value)) {
      const result = {};
      for (const [prop, child] of Object.entries(value)) {
        const key = (_a7 = getKey == null ? void 0 : getKey(prop)) != null ? _a7 : prop;
        const childPath = [...path, key];
        if (stop == null ? void 0 : stop(value, childPath)) {
          return predicate(value, path);
        }
        result[key] = inner(child, childPath);
      }
      return result;
    }
    return predicate(value, path);
  }
  return inner(target);
}
var tokens = [
  "colors",
  "borders",
  "borderWidths",
  "borderStyles",
  "fonts",
  "fontSizes",
  "fontWeights",
  "gradients",
  "letterSpacings",
  "lineHeights",
  "radii",
  "space",
  "shadows",
  "sizes",
  "zIndices",
  "transition",
  "blur",
  "breakpoints"
];
function extractTokens(theme2) {
  const _tokens = tokens;
  return pick(theme2, _tokens);
}
function extractSemanticTokens(theme2) {
  return theme2.semanticTokens;
}
function omitVars(rawTheme) {
  const { __cssMap, __cssVars, __breakpoints, ...cleanTheme } = rawTheme;
  return cleanTheme;
}
var isSemanticCondition = (key) => pseudoPropNames.includes(key) || "default" === key;
function flattenTokens({
  tokens: tokens2,
  semanticTokens: semanticTokens2
}) {
  const result = {};
  walkObject(tokens2, (value, path) => {
    if (value == null)
      return;
    result[path.join(".")] = { isSemantic: false, value };
  });
  walkObject(
    semanticTokens2,
    (value, path) => {
      if (value == null)
        return;
      result[path.join(".")] = { isSemantic: true, value };
    },
    {
      stop: (value) => Object.keys(value).every(isSemanticCondition)
    }
  );
  return result;
}
function toCSSVar(rawTheme) {
  var _a7;
  const theme2 = omitVars(rawTheme);
  const tokens2 = extractTokens(theme2);
  const semanticTokens2 = extractSemanticTokens(theme2);
  const flatTokens = flattenTokens({ tokens: tokens2, semanticTokens: semanticTokens2 });
  const cssVarPrefix = (_a7 = theme2.config) == null ? void 0 : _a7.cssVarPrefix;
  const {
    /**
     * This is more like a dictionary of tokens users will type `green.500`,
     * and their equivalent css variable.
     */
    cssMap,
    /**
     * The extracted css variables will be stored here, and used in
     * the emotion's <Global/> component to attach variables to `:root`
     */
    cssVars: cssVars2
  } = createThemeVars(flatTokens, { cssVarPrefix });
  const defaultCssVars = {
    "--chakra-ring-inset": "var(--chakra-empty,/*!*/ /*!*/)",
    "--chakra-ring-offset-width": "0px",
    "--chakra-ring-offset-color": "#fff",
    "--chakra-ring-color": "rgba(66, 153, 225, 0.6)",
    "--chakra-ring-offset-shadow": "0 0 #0000",
    "--chakra-ring-shadow": "0 0 #0000",
    "--chakra-space-x-reverse": "0",
    "--chakra-space-y-reverse": "0"
  };
  Object.assign(theme2, {
    __cssVars: { ...defaultCssVars, ...cssVars2 },
    __cssMap: cssMap,
    __breakpoints: analyzeBreakpoints(theme2.breakpoints)
  });
  return theme2;
}
var systemProps = (0, import_lodash3.default)(
  {},
  background,
  border,
  color,
  flexbox,
  layout,
  filter,
  ring,
  interactivity,
  grid,
  others,
  position,
  effect,
  space,
  scroll,
  typography,
  textDecoration,
  transform,
  list,
  transition
);
var layoutSystem = Object.assign({}, space, layout, flexbox, grid, position);
var layoutPropNames = Object.keys(
  layoutSystem
);
var propNames = [...Object.keys(systemProps), ...pseudoPropNames];
var styleProps = { ...systemProps, ...pseudoSelectors };
var isStyleProp = (prop) => prop in styleProps;
var expandResponsive = (styles2) => (theme2) => {
  if (!theme2.__breakpoints)
    return styles2;
  const { isResponsive, toArrayValue, media: medias } = theme2.__breakpoints;
  const computedStyles = {};
  for (const key in styles2) {
    let value = runIfFn(styles2[key], theme2);
    if (value == null)
      continue;
    value = isObject(value) && isResponsive(value) ? toArrayValue(value) : value;
    if (!Array.isArray(value)) {
      computedStyles[key] = value;
      continue;
    }
    const queries = value.slice(0, medias.length).length;
    for (let index2 = 0; index2 < queries; index2 += 1) {
      const media = medias == null ? void 0 : medias[index2];
      if (!media) {
        computedStyles[key] = value[index2];
        continue;
      }
      computedStyles[media] = computedStyles[media] || {};
      if (value[index2] == null) {
        continue;
      }
      computedStyles[media][key] = value[index2];
    }
  }
  return computedStyles;
};
function splitByComma(value) {
  const chunks = [];
  let chunk = "";
  let inParens = false;
  for (let i = 0; i < value.length; i++) {
    const char = value[i];
    if (char === "(") {
      inParens = true;
      chunk += char;
    } else if (char === ")") {
      inParens = false;
      chunk += char;
    } else if (char === "," && !inParens) {
      chunks.push(chunk);
      chunk = "";
    } else {
      chunk += char;
    }
  }
  chunk = chunk.trim();
  if (chunk) {
    chunks.push(chunk);
  }
  return chunks;
}
function isCssVar2(value) {
  return /^var\(--.+\)$/.test(value);
}
var isCSSVariableTokenValue = (key, value) => key.startsWith("--") && typeof value === "string" && !isCssVar2(value);
var resolveTokenValue = (theme2, value) => {
  var _a7, _b5;
  if (value == null)
    return value;
  const getVar = (val) => {
    var _a24, _b22;
    return (_b22 = (_a24 = theme2.__cssMap) == null ? void 0 : _a24[val]) == null ? void 0 : _b22.varRef;
  };
  const getValue = (val) => {
    var _a24;
    return (_a24 = getVar(val)) != null ? _a24 : val;
  };
  const [tokenValue, fallbackValue] = splitByComma(value);
  value = (_b5 = (_a7 = getVar(tokenValue)) != null ? _a7 : getValue(fallbackValue)) != null ? _b5 : getValue(value);
  return value;
};
function getCss(options) {
  const { configs = {}, pseudos = {}, theme: theme2 } = options;
  const css22 = (stylesOrFn, nested = false) => {
    var _a7, _b5, _c3;
    const _styles = runIfFn(stylesOrFn, theme2);
    const styles2 = expandResponsive(_styles)(theme2);
    let computedStyles = {};
    for (let key in styles2) {
      const valueOrFn = styles2[key];
      let value = runIfFn(valueOrFn, theme2);
      if (key in pseudos) {
        key = pseudos[key];
      }
      if (isCSSVariableTokenValue(key, value)) {
        value = resolveTokenValue(theme2, value);
      }
      let config2 = configs[key];
      if (config2 === true) {
        config2 = { property: key };
      }
      if (isObject(value)) {
        computedStyles[key] = (_a7 = computedStyles[key]) != null ? _a7 : {};
        computedStyles[key] = (0, import_lodash2.default)(
          {},
          computedStyles[key],
          css22(value, true)
        );
        continue;
      }
      let rawValue = (_c3 = (_b5 = config2 == null ? void 0 : config2.transform) == null ? void 0 : _b5.call(config2, value, theme2, _styles)) != null ? _c3 : value;
      rawValue = (config2 == null ? void 0 : config2.processResult) ? css22(rawValue, true) : rawValue;
      const configProperty = runIfFn(config2 == null ? void 0 : config2.property, theme2);
      if (!nested && (config2 == null ? void 0 : config2.static)) {
        const staticStyles = runIfFn(config2.static, theme2);
        computedStyles = (0, import_lodash2.default)({}, computedStyles, staticStyles);
      }
      if (configProperty && Array.isArray(configProperty)) {
        for (const property of configProperty) {
          computedStyles[property] = rawValue;
        }
        continue;
      }
      if (configProperty) {
        if (configProperty === "&" && isObject(rawValue)) {
          computedStyles = (0, import_lodash2.default)({}, computedStyles, rawValue);
        } else {
          computedStyles[configProperty] = rawValue;
        }
        continue;
      }
      if (isObject(rawValue)) {
        computedStyles = (0, import_lodash2.default)({}, computedStyles, rawValue);
        continue;
      }
      computedStyles[key] = rawValue;
    }
    return computedStyles;
  };
  return css22;
}
var css2 = (styles2) => (theme2) => {
  const cssFn = getCss({
    theme: theme2,
    pseudos: pseudoSelectors,
    configs: systemProps
  });
  return cssFn(styles2);
};
function defineStyle(styles2) {
  return styles2;
}
function defineStyleConfig(config2) {
  return config2;
}
function createMultiStyleConfigHelpers(parts) {
  return {
    definePartsStyle(config2) {
      return config2;
    },
    defineMultiStyleConfig(config2) {
      return { parts, ...config2 };
    }
  };
}
function normalize2(value, toArray) {
  if (Array.isArray(value))
    return value;
  if (isObject(value))
    return toArray(value);
  if (value != null)
    return [value];
}
function getNextIndex(values, i) {
  for (let j = i + 1; j < values.length; j++) {
    if (values[j] != null)
      return j;
  }
  return -1;
}
function createResolver(theme2) {
  const breakpointUtil = theme2.__breakpoints;
  return function resolver(config2, prop, value, props) {
    var _a7, _b5;
    if (!breakpointUtil)
      return;
    const result = {};
    const normalized = normalize2(value, breakpointUtil.toArrayValue);
    if (!normalized)
      return result;
    const len = normalized.length;
    const isSingle = len === 1;
    const isMultipart = !!config2.parts;
    for (let i = 0; i < len; i++) {
      const key = breakpointUtil.details[i];
      const nextKey = breakpointUtil.details[getNextIndex(normalized, i)];
      const query = toMediaQueryString(key.minW, nextKey == null ? void 0 : nextKey._minW);
      const styles2 = runIfFn((_a7 = config2[prop]) == null ? void 0 : _a7[normalized[i]], props);
      if (!styles2)
        continue;
      if (isMultipart) {
        (_b5 = config2.parts) == null ? void 0 : _b5.forEach((part) => {
          (0, import_lodash4.default)(result, {
            [part]: isSingle ? styles2[part] : { [query]: styles2[part] }
          });
        });
        continue;
      }
      if (!isMultipart) {
        if (isSingle)
          (0, import_lodash4.default)(result, styles2);
        else
          result[query] = styles2;
        continue;
      }
      result[query] = styles2;
    }
    return result;
  };
}
function resolveStyleConfig(config2) {
  return (props) => {
    var _a7;
    const { variant, size: size2, theme: theme2 } = props;
    const recipe = createResolver(theme2);
    return (0, import_lodash4.default)(
      {},
      runIfFn((_a7 = config2.baseStyle) != null ? _a7 : {}, props),
      recipe(config2, "sizes", size2, props),
      recipe(config2, "variants", variant, props)
    );
  };
}
function getCSSVar(theme2, scale3, value) {
  var _a7, _b5, _c3;
  return (_c3 = (_b5 = (_a7 = theme2.__cssMap) == null ? void 0 : _a7[`${scale3}.${value}`]) == null ? void 0 : _b5.varRef) != null ? _c3 : value;
}
function omitThemingProps(props) {
  return omit(props, ["styleConfig", "size", "variant", "colorScheme"]);
}

// node_modules/@chakra-ui/theme/dist/chunk-SIH73G3H.mjs
var transitionProperty = {
  common: "background-color, border-color, color, fill, stroke, opacity, box-shadow, transform",
  colors: "background-color, border-color, color, fill, stroke",
  dimensions: "width, height",
  position: "left, right, top, bottom",
  background: "background-color, background-image, background-position"
};
var transitionTimingFunction = {
  "ease-in": "cubic-bezier(0.4, 0, 1, 1)",
  "ease-out": "cubic-bezier(0, 0, 0.2, 1)",
  "ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)"
};
var transitionDuration = {
  "ultra-fast": "50ms",
  faster: "100ms",
  fast: "150ms",
  normal: "200ms",
  slow: "300ms",
  slower: "400ms",
  "ultra-slow": "500ms"
};
var transition2 = {
  property: transitionProperty,
  easing: transitionTimingFunction,
  duration: transitionDuration
};
var transition_default = transition2;

// node_modules/@chakra-ui/theme/dist/chunk-45VJLTIL.mjs
var zIndices = {
  hide: -1,
  auto: "auto",
  base: 0,
  docked: 10,
  dropdown: 1e3,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800
};
var z_index_default = zIndices;

// node_modules/@chakra-ui/theme/dist/chunk-B75T2J64.mjs
var borders = {
  none: 0,
  "1px": "1px solid",
  "2px": "2px solid",
  "4px": "4px solid",
  "8px": "8px solid"
};
var borders_default = borders;

// node_modules/@chakra-ui/theme/dist/chunk-TXLFBUTF.mjs
var breakpoints = {
  base: "0em",
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em"
};
var breakpoints_default = breakpoints;

// node_modules/@chakra-ui/theme/dist/chunk-E47HH2QS.mjs
var colors = {
  transparent: "transparent",
  current: "currentColor",
  black: "#000000",
  white: "#FFFFFF",
  whiteAlpha: {
    50: "rgba(255, 255, 255, 0.04)",
    100: "rgba(255, 255, 255, 0.06)",
    200: "rgba(255, 255, 255, 0.08)",
    300: "rgba(255, 255, 255, 0.16)",
    400: "rgba(255, 255, 255, 0.24)",
    500: "rgba(255, 255, 255, 0.36)",
    600: "rgba(255, 255, 255, 0.48)",
    700: "rgba(255, 255, 255, 0.64)",
    800: "rgba(255, 255, 255, 0.80)",
    900: "rgba(255, 255, 255, 0.92)"
  },
  blackAlpha: {
    50: "rgba(0, 0, 0, 0.04)",
    100: "rgba(0, 0, 0, 0.06)",
    200: "rgba(0, 0, 0, 0.08)",
    300: "rgba(0, 0, 0, 0.16)",
    400: "rgba(0, 0, 0, 0.24)",
    500: "rgba(0, 0, 0, 0.36)",
    600: "rgba(0, 0, 0, 0.48)",
    700: "rgba(0, 0, 0, 0.64)",
    800: "rgba(0, 0, 0, 0.80)",
    900: "rgba(0, 0, 0, 0.92)"
  },
  gray: {
    50: "#F7FAFC",
    100: "#EDF2F7",
    200: "#E2E8F0",
    300: "#CBD5E0",
    400: "#A0AEC0",
    500: "#718096",
    600: "#4A5568",
    700: "#2D3748",
    800: "#1A202C",
    900: "#171923"
  },
  red: {
    50: "#FFF5F5",
    100: "#FED7D7",
    200: "#FEB2B2",
    300: "#FC8181",
    400: "#F56565",
    500: "#E53E3E",
    600: "#C53030",
    700: "#9B2C2C",
    800: "#822727",
    900: "#63171B"
  },
  orange: {
    50: "#FFFAF0",
    100: "#FEEBC8",
    200: "#FBD38D",
    300: "#F6AD55",
    400: "#ED8936",
    500: "#DD6B20",
    600: "#C05621",
    700: "#9C4221",
    800: "#7B341E",
    900: "#652B19"
  },
  yellow: {
    50: "#FFFFF0",
    100: "#FEFCBF",
    200: "#FAF089",
    300: "#F6E05E",
    400: "#ECC94B",
    500: "#D69E2E",
    600: "#B7791F",
    700: "#975A16",
    800: "#744210",
    900: "#5F370E"
  },
  green: {
    50: "#F0FFF4",
    100: "#C6F6D5",
    200: "#9AE6B4",
    300: "#68D391",
    400: "#48BB78",
    500: "#38A169",
    600: "#2F855A",
    700: "#276749",
    800: "#22543D",
    900: "#1C4532"
  },
  teal: {
    50: "#E6FFFA",
    100: "#B2F5EA",
    200: "#81E6D9",
    300: "#4FD1C5",
    400: "#38B2AC",
    500: "#319795",
    600: "#2C7A7B",
    700: "#285E61",
    800: "#234E52",
    900: "#1D4044"
  },
  blue: {
    50: "#ebf8ff",
    100: "#bee3f8",
    200: "#90cdf4",
    300: "#63b3ed",
    400: "#4299e1",
    500: "#3182ce",
    600: "#2b6cb0",
    700: "#2c5282",
    800: "#2a4365",
    900: "#1A365D"
  },
  cyan: {
    50: "#EDFDFD",
    100: "#C4F1F9",
    200: "#9DECF9",
    300: "#76E4F7",
    400: "#0BC5EA",
    500: "#00B5D8",
    600: "#00A3C4",
    700: "#0987A0",
    800: "#086F83",
    900: "#065666"
  },
  purple: {
    50: "#FAF5FF",
    100: "#E9D8FD",
    200: "#D6BCFA",
    300: "#B794F4",
    400: "#9F7AEA",
    500: "#805AD5",
    600: "#6B46C1",
    700: "#553C9A",
    800: "#44337A",
    900: "#322659"
  },
  pink: {
    50: "#FFF5F7",
    100: "#FED7E2",
    200: "#FBB6CE",
    300: "#F687B3",
    400: "#ED64A6",
    500: "#D53F8C",
    600: "#B83280",
    700: "#97266D",
    800: "#702459",
    900: "#521B41"
  },
  linkedin: {
    50: "#E8F4F9",
    100: "#CFEDFB",
    200: "#9BDAF3",
    300: "#68C7EC",
    400: "#34B3E4",
    500: "#00A0DC",
    600: "#008CC9",
    700: "#0077B5",
    800: "#005E93",
    900: "#004471"
  },
  facebook: {
    50: "#E8F4F9",
    100: "#D9DEE9",
    200: "#B7C2DA",
    300: "#6482C0",
    400: "#4267B2",
    500: "#385898",
    600: "#314E89",
    700: "#29487D",
    800: "#223B67",
    900: "#1E355B"
  },
  messenger: {
    50: "#D0E6FF",
    100: "#B9DAFF",
    200: "#A2CDFF",
    300: "#7AB8FF",
    400: "#2E90FF",
    500: "#0078FF",
    600: "#0063D1",
    700: "#0052AC",
    800: "#003C7E",
    900: "#002C5C"
  },
  whatsapp: {
    50: "#dffeec",
    100: "#b9f5d0",
    200: "#90edb3",
    300: "#65e495",
    400: "#3cdd78",
    500: "#22c35e",
    600: "#179848",
    700: "#0c6c33",
    800: "#01421c",
    900: "#001803"
  },
  twitter: {
    50: "#E5F4FD",
    100: "#C8E9FB",
    200: "#A8DCFA",
    300: "#83CDF7",
    400: "#57BBF5",
    500: "#1DA1F2",
    600: "#1A94DA",
    700: "#1681BF",
    800: "#136B9E",
    900: "#0D4D71"
  },
  telegram: {
    50: "#E3F2F9",
    100: "#C5E4F3",
    200: "#A2D4EC",
    300: "#7AC1E4",
    400: "#47A9DA",
    500: "#0088CC",
    600: "#007AB8",
    700: "#006BA1",
    800: "#005885",
    900: "#003F5E"
  }
};
var colors_default = colors;

// node_modules/@chakra-ui/theme/dist/chunk-VIVTPWHP.mjs
var radii = {
  none: "0",
  sm: "0.125rem",
  base: "0.25rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1rem",
  "3xl": "1.5rem",
  full: "9999px"
};
var radius_default = radii;

// node_modules/@chakra-ui/theme/dist/chunk-IZUFFCXS.mjs
var shadows = {
  xs: "0 0 0 1px rgba(0, 0, 0, 0.05)",
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  outline: "0 0 0 3px rgba(66, 153, 225, 0.6)",
  inner: "inset 0 2px 4px 0 rgba(0,0,0,0.06)",
  none: "none",
  "dark-lg": "rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.4) 0px 15px 40px"
};
var shadows_default = shadows;

// node_modules/@chakra-ui/theme/dist/chunk-HQ6WXDYV.mjs
var blur = {
  none: 0,
  sm: "4px",
  base: "8px",
  md: "12px",
  lg: "16px",
  xl: "24px",
  "2xl": "40px",
  "3xl": "64px"
};
var blur_default = blur;

// node_modules/@chakra-ui/theme/dist/chunk-6XA2KDUD.mjs
var typography2 = {
  letterSpacings: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em"
  },
  lineHeights: {
    normal: "normal",
    none: 1,
    shorter: 1.25,
    short: 1.375,
    base: 1.5,
    tall: 1.625,
    taller: "2",
    "3": ".75rem",
    "4": "1rem",
    "5": "1.25rem",
    "6": "1.5rem",
    "7": "1.75rem",
    "8": "2rem",
    "9": "2.25rem",
    "10": "2.5rem"
  },
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900
  },
  fonts: {
    heading: `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    body: `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    mono: `SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace`
  },
  fontSizes: {
    "3xs": "0.45rem",
    "2xs": "0.625rem",
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
    "8xl": "6rem",
    "9xl": "8rem"
  }
};
var typography_default = typography2;

// node_modules/@chakra-ui/theme/dist/chunk-V7WMN6TQ.mjs
var spacing = {
  px: "1px",
  0.5: "0.125rem",
  1: "0.25rem",
  1.5: "0.375rem",
  2: "0.5rem",
  2.5: "0.625rem",
  3: "0.75rem",
  3.5: "0.875rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  7: "1.75rem",
  8: "2rem",
  9: "2.25rem",
  10: "2.5rem",
  12: "3rem",
  14: "3.5rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  28: "7rem",
  32: "8rem",
  36: "9rem",
  40: "10rem",
  44: "11rem",
  48: "12rem",
  52: "13rem",
  56: "14rem",
  60: "15rem",
  64: "16rem",
  72: "18rem",
  80: "20rem",
  96: "24rem"
};

// node_modules/@chakra-ui/theme/dist/chunk-NJCYBKFH.mjs
var largeSizes = {
  max: "max-content",
  min: "min-content",
  full: "100%",
  "3xs": "14rem",
  "2xs": "16rem",
  xs: "20rem",
  sm: "24rem",
  md: "28rem",
  lg: "32rem",
  xl: "36rem",
  "2xl": "42rem",
  "3xl": "48rem",
  "4xl": "56rem",
  "5xl": "64rem",
  "6xl": "72rem",
  "7xl": "80rem",
  "8xl": "90rem",
  prose: "60ch"
};
var container = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px"
};
var sizes = {
  ...spacing,
  ...largeSizes,
  container
};
var sizes_default = sizes;

// node_modules/@chakra-ui/theme/dist/chunk-3WO5B3NB.mjs
var foundations = {
  breakpoints: breakpoints_default,
  zIndices: z_index_default,
  radii: radius_default,
  blur: blur_default,
  colors: colors_default,
  ...typography_default,
  sizes: sizes_default,
  shadows: shadows_default,
  space: spacing,
  borders: borders_default,
  transition: transition_default
};

// node_modules/@chakra-ui/theme/dist/chunk-Q5NOVGYN.mjs
var { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers([
  "stepper",
  "step",
  "title",
  "description",
  "indicator",
  "separator",
  "icon",
  "number"
]);
var $size = cssVar("stepper-indicator-size");
var $iconSize = cssVar("stepper-icon-size");
var $titleFontSize = cssVar("stepper-title-font-size");
var $descFontSize = cssVar("stepper-description-font-size");
var $accentColor = cssVar("stepper-accent-color");
var baseStyle = definePartsStyle(({ colorScheme: c }) => ({
  stepper: {
    display: "flex",
    justifyContent: "space-between",
    gap: "4",
    "&[data-orientation=vertical]": {
      flexDirection: "column",
      alignItems: "flex-start"
    },
    "&[data-orientation=horizontal]": {
      flexDirection: "row",
      alignItems: "center"
    },
    [$accentColor.variable]: `colors.${c}.500`,
    _dark: {
      [$accentColor.variable]: `colors.${c}.200`
    }
  },
  title: {
    fontSize: $titleFontSize.reference,
    fontWeight: "medium"
  },
  description: {
    fontSize: $descFontSize.reference,
    color: "chakra-subtle-text"
  },
  number: {
    fontSize: $titleFontSize.reference
  },
  step: {
    flexShrink: 0,
    position: "relative",
    display: "flex",
    gap: "2",
    "&[data-orientation=horizontal]": {
      alignItems: "center"
    },
    flex: "1",
    "&:last-of-type:not([data-stretch])": {
      flex: "initial"
    }
  },
  icon: {
    flexShrink: 0,
    width: $iconSize.reference,
    height: $iconSize.reference
  },
  indicator: {
    flexShrink: 0,
    borderRadius: "full",
    width: $size.reference,
    height: $size.reference,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&[data-status=active]": {
      borderWidth: "2px",
      borderColor: $accentColor.reference
    },
    "&[data-status=complete]": {
      bg: $accentColor.reference,
      color: "chakra-inverse-text"
    },
    "&[data-status=incomplete]": {
      borderWidth: "2px"
    }
  },
  separator: {
    bg: "chakra-border-color",
    flex: "1",
    "&[data-status=complete]": {
      bg: $accentColor.reference
    },
    "&[data-orientation=horizontal]": {
      width: "100%",
      height: "2px",
      marginStart: "2"
    },
    "&[data-orientation=vertical]": {
      width: "2px",
      position: "absolute",
      height: "100%",
      maxHeight: `calc(100% - ${$size.reference} - 8px)`,
      top: `calc(${$size.reference} + 4px)`,
      insetStart: `calc(${$size.reference} / 2 - 1px)`
    }
  }
}));
var stepperTheme = defineMultiStyleConfig({
  baseStyle,
  sizes: {
    xs: definePartsStyle({
      stepper: {
        [$size.variable]: "sizes.4",
        [$iconSize.variable]: "sizes.3",
        [$titleFontSize.variable]: "fontSizes.xs",
        [$descFontSize.variable]: "fontSizes.xs"
      }
    }),
    sm: definePartsStyle({
      stepper: {
        [$size.variable]: "sizes.6",
        [$iconSize.variable]: "sizes.4",
        [$titleFontSize.variable]: "fontSizes.sm",
        [$descFontSize.variable]: "fontSizes.xs"
      }
    }),
    md: definePartsStyle({
      stepper: {
        [$size.variable]: "sizes.8",
        [$iconSize.variable]: "sizes.5",
        [$titleFontSize.variable]: "fontSizes.md",
        [$descFontSize.variable]: "fontSizes.sm"
      }
    }),
    lg: definePartsStyle({
      stepper: {
        [$size.variable]: "sizes.10",
        [$iconSize.variable]: "sizes.6",
        [$titleFontSize.variable]: "fontSizes.lg",
        [$descFontSize.variable]: "fontSizes.md"
      }
    })
  },
  defaultProps: {
    size: "md",
    colorScheme: "blue"
  }
});

// node_modules/@chakra-ui/anatomy/dist/chunk-OA3DH5LS.mjs
function anatomy(name, map = {}) {
  let called = false;
  function assert() {
    if (!called) {
      called = true;
      return;
    }
    throw new Error(
      "[anatomy] .part(...) should only be called once. Did you mean to use .extend(...) ?"
    );
  }
  function parts(...values) {
    assert();
    for (const part of values) {
      ;
      map[part] = toPart(part);
    }
    return anatomy(name, map);
  }
  function extend(...parts2) {
    for (const part of parts2) {
      if (part in map)
        continue;
      map[part] = toPart(part);
    }
    return anatomy(name, map);
  }
  function selectors() {
    const value = Object.fromEntries(
      Object.entries(map).map(([key, part]) => [key, part.selector])
    );
    return value;
  }
  function classnames() {
    const value = Object.fromEntries(
      Object.entries(map).map(([key, part]) => [key, part.className])
    );
    return value;
  }
  function toPart(part) {
    const el = ["container", "root"].includes(part != null ? part : "") ? [name] : [name, part];
    const attr = el.filter(Boolean).join("__");
    const className = `chakra-${attr}`;
    const partObj = {
      className,
      selector: `.${className}`,
      toString: () => part
    };
    return partObj;
  }
  const __type = {};
  return {
    parts,
    toPart,
    extend,
    selectors,
    classnames,
    get keys() {
      return Object.keys(map);
    },
    __type
  };
}

// node_modules/@chakra-ui/anatomy/dist/chunk-7OOI6RFH.mjs
var accordionAnatomy = anatomy("accordion").parts("root", "container", "button", "panel").extend("icon");
var alertAnatomy = anatomy("alert").parts("title", "description", "container").extend("icon", "spinner");
var avatarAnatomy = anatomy("avatar").parts("label", "badge", "container").extend("excessLabel", "group");
var breadcrumbAnatomy = anatomy("breadcrumb").parts("link", "item", "container").extend("separator");
var buttonAnatomy = anatomy("button").parts();
var checkboxAnatomy = anatomy("checkbox").parts("control", "icon", "container").extend("label");
var circularProgressAnatomy = anatomy("progress").parts("track", "filledTrack").extend("label");
var drawerAnatomy = anatomy("drawer").parts("overlay", "dialogContainer", "dialog").extend("header", "closeButton", "body", "footer");
var editableAnatomy = anatomy("editable").parts(
  "preview",
  "input",
  "textarea"
);
var formAnatomy = anatomy("form").parts(
  "container",
  "requiredIndicator",
  "helperText"
);
var formErrorAnatomy = anatomy("formError").parts("text", "icon");
var inputAnatomy = anatomy("input").parts(
  "addon",
  "field",
  "element",
  "group"
);
var listAnatomy = anatomy("list").parts("container", "item", "icon");
var menuAnatomy = anatomy("menu").parts("button", "list", "item").extend("groupTitle", "icon", "command", "divider");
var modalAnatomy = anatomy("modal").parts("overlay", "dialogContainer", "dialog").extend("header", "closeButton", "body", "footer");
var numberInputAnatomy = anatomy("numberinput").parts(
  "root",
  "field",
  "stepperGroup",
  "stepper"
);
var pinInputAnatomy = anatomy("pininput").parts("field");
var popoverAnatomy = anatomy("popover").parts("content", "header", "body", "footer").extend("popper", "arrow", "closeButton");
var progressAnatomy = anatomy("progress").parts(
  "label",
  "filledTrack",
  "track"
);
var radioAnatomy = anatomy("radio").parts(
  "container",
  "control",
  "label"
);
var selectAnatomy = anatomy("select").parts("field", "icon");
var sliderAnatomy = anatomy("slider").parts(
  "container",
  "track",
  "thumb",
  "filledTrack",
  "mark"
);
var statAnatomy = anatomy("stat").parts(
  "container",
  "label",
  "helpText",
  "number",
  "icon"
);
var switchAnatomy = anatomy("switch").parts(
  "container",
  "track",
  "thumb",
  "label"
);
var tableAnatomy = anatomy("table").parts(
  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
  "tfoot",
  "caption"
);
var tabsAnatomy = anatomy("tabs").parts(
  "root",
  "tab",
  "tablist",
  "tabpanel",
  "tabpanels",
  "indicator"
);
var tagAnatomy = anatomy("tag").parts(
  "container",
  "label",
  "closeButton"
);
var cardAnatomy = anatomy("card").parts(
  "container",
  "header",
  "body",
  "footer"
);
var stepperAnatomy = anatomy("stepper").parts(
  "stepper",
  "step",
  "title",
  "description",
  "indicator",
  "separator",
  "icon",
  "number"
);

// node_modules/color2k/dist/index.exports.import.es.mjs
function guard(low, high, value) {
  return Math.min(Math.max(low, value), high);
}
var ColorError = class extends Error {
  constructor(color3) {
    super(`Failed to parse color: "${color3}"`);
  }
};
var ColorError$1 = ColorError;
function parseToRgba(color3) {
  if (typeof color3 !== "string")
    throw new ColorError$1(color3);
  if (color3.trim().toLowerCase() === "transparent")
    return [0, 0, 0, 0];
  let normalizedColor = color3.trim();
  normalizedColor = namedColorRegex.test(color3) ? nameToHex(color3) : color3;
  const reducedHexMatch = reducedHexRegex.exec(normalizedColor);
  if (reducedHexMatch) {
    const arr = Array.from(reducedHexMatch).slice(1);
    return [...arr.slice(0, 3).map((x) => parseInt(r(x, 2), 16)), parseInt(r(arr[3] || "f", 2), 16) / 255];
  }
  const hexMatch = hexRegex.exec(normalizedColor);
  if (hexMatch) {
    const arr = Array.from(hexMatch).slice(1);
    return [...arr.slice(0, 3).map((x) => parseInt(x, 16)), parseInt(arr[3] || "ff", 16) / 255];
  }
  const rgbaMatch = rgbaRegex.exec(normalizedColor);
  if (rgbaMatch) {
    const arr = Array.from(rgbaMatch).slice(1);
    return [...arr.slice(0, 3).map((x) => parseInt(x, 10)), parseFloat(arr[3] || "1")];
  }
  const hslaMatch = hslaRegex.exec(normalizedColor);
  if (hslaMatch) {
    const [h, s, l, a] = Array.from(hslaMatch).slice(1).map(parseFloat);
    if (guard(0, 100, s) !== s)
      throw new ColorError$1(color3);
    if (guard(0, 100, l) !== l)
      throw new ColorError$1(color3);
    return [...hslToRgb(h, s, l), Number.isNaN(a) ? 1 : a];
  }
  throw new ColorError$1(color3);
}
function hash(str) {
  let hash4 = 5381;
  let i = str.length;
  while (i) {
    hash4 = hash4 * 33 ^ str.charCodeAt(--i);
  }
  return (hash4 >>> 0) % 2341;
}
var colorToInt = (x) => parseInt(x.replace(/_/g, ""), 36);
var compressedColorMap = "1q29ehhb 1n09sgk7 1kl1ekf_ _yl4zsno 16z9eiv3 1p29lhp8 _bd9zg04 17u0____ _iw9zhe5 _to73___ _r45e31e _7l6g016 _jh8ouiv _zn3qba8 1jy4zshs 11u87k0u 1ro9yvyo 1aj3xael 1gz9zjz0 _3w8l4xo 1bf1ekf_ _ke3v___ _4rrkb__ 13j776yz _646mbhl _nrjr4__ _le6mbhl 1n37ehkb _m75f91n _qj3bzfz 1939yygw 11i5z6x8 _1k5f8xs 1509441m 15t5lwgf _ae2th1n _tg1ugcv 1lp1ugcv 16e14up_ _h55rw7n _ny9yavn _7a11xb_ 1ih442g9 _pv442g9 1mv16xof 14e6y7tu 1oo9zkds 17d1cisi _4v9y70f _y98m8kc 1019pq0v 12o9zda8 _348j4f4 1et50i2o _8epa8__ _ts6senj 1o350i2o 1mi9eiuo 1259yrp0 1ln80gnw _632xcoy 1cn9zldc _f29edu4 1n490c8q _9f9ziet 1b94vk74 _m49zkct 1kz6s73a 1eu9dtog _q58s1rz 1dy9sjiq __u89jo3 _aj5nkwg _ld89jo3 13h9z6wx _qa9z2ii _l119xgq _bs5arju 1hj4nwk9 1qt4nwk9 1ge6wau6 14j9zlcw 11p1edc_ _ms1zcxe _439shk6 _jt9y70f _754zsow 1la40eju _oq5p___ _x279qkz 1fa5r3rv _yd2d9ip _424tcku _8y1di2_ _zi2uabw _yy7rn9h 12yz980_ __39ljp6 1b59zg0x _n39zfzp 1fy9zest _b33k___ _hp9wq92 1il50hz4 _io472ub _lj9z3eo 19z9ykg0 _8t8iu3a 12b9bl4a 1ak5yw0o _896v4ku _tb8k8lv _s59zi6t _c09ze0p 1lg80oqn 1id9z8wb _238nba5 1kq6wgdi _154zssg _tn3zk49 _da9y6tc 1sg7cv4f _r12jvtt 1gq5fmkz 1cs9rvci _lp9jn1c _xw1tdnb 13f9zje6 16f6973h _vo7ir40 _bt5arjf _rc45e4t _hr4e100 10v4e100 _hc9zke2 _w91egv_ _sj2r1kk 13c87yx8 _vqpds__ _ni8ggk8 _tj9yqfb 1ia2j4r4 _7x9b10u 1fc9ld4j 1eq9zldr _5j9lhpx _ez9zl6o _md61fzm".split(" ").reduce((acc, next) => {
  const key = colorToInt(next.substring(0, 3));
  const hex2 = colorToInt(next.substring(3)).toString(16);
  let prefix = "";
  for (let i = 0; i < 6 - hex2.length; i++) {
    prefix += "0";
  }
  acc[key] = `${prefix}${hex2}`;
  return acc;
}, {});
function nameToHex(color3) {
  const normalizedColorName = color3.toLowerCase().trim();
  const result = compressedColorMap[hash(normalizedColorName)];
  if (!result)
    throw new ColorError$1(color3);
  return `#${result}`;
}
var r = (str, amount) => Array.from(Array(amount)).map(() => str).join("");
var reducedHexRegex = new RegExp(`^#${r("([a-f0-9])", 3)}([a-f0-9])?$`, "i");
var hexRegex = new RegExp(`^#${r("([a-f0-9]{2})", 3)}([a-f0-9]{2})?$`, "i");
var rgbaRegex = new RegExp(`^rgba?\\(\\s*(\\d+)\\s*${r(",\\s*(\\d+)\\s*", 2)}(?:,\\s*([\\d.]+))?\\s*\\)$`, "i");
var hslaRegex = /^hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%(?:\s*,\s*([\d.]+))?\s*\)$/i;
var namedColorRegex = /^[a-z]+$/i;
var roundColor = (color3) => {
  return Math.round(color3 * 255);
};
var hslToRgb = (hue, saturation, lightness) => {
  let l = lightness / 100;
  if (saturation === 0) {
    return [l, l, l].map(roundColor);
  }
  const huePrime = (hue % 360 + 360) % 360 / 60;
  const chroma = (1 - Math.abs(2 * l - 1)) * (saturation / 100);
  const secondComponent = chroma * (1 - Math.abs(huePrime % 2 - 1));
  let red = 0;
  let green = 0;
  let blue = 0;
  if (huePrime >= 0 && huePrime < 1) {
    red = chroma;
    green = secondComponent;
  } else if (huePrime >= 1 && huePrime < 2) {
    red = secondComponent;
    green = chroma;
  } else if (huePrime >= 2 && huePrime < 3) {
    green = chroma;
    blue = secondComponent;
  } else if (huePrime >= 3 && huePrime < 4) {
    green = secondComponent;
    blue = chroma;
  } else if (huePrime >= 4 && huePrime < 5) {
    red = secondComponent;
    blue = chroma;
  } else if (huePrime >= 5 && huePrime < 6) {
    red = chroma;
    blue = secondComponent;
  }
  const lightnessModification = l - chroma / 2;
  const finalRed = red + lightnessModification;
  const finalGreen = green + lightnessModification;
  const finalBlue = blue + lightnessModification;
  return [finalRed, finalGreen, finalBlue].map(roundColor);
};
function rgba(red, green, blue, alpha2) {
  return `rgba(${guard(0, 255, red).toFixed()}, ${guard(0, 255, green).toFixed()}, ${guard(0, 255, blue).toFixed()}, ${parseFloat(guard(0, 1, alpha2).toFixed(3))})`;
}
function transparentize(color3, amount) {
  const [r2, g, b, a] = parseToRgba(color3);
  return rgba(r2, g, b, a - amount);
}
function toHex(color3) {
  const [r2, g, b, a] = parseToRgba(color3);
  let hex2 = (x) => {
    const h = guard(0, 255, x).toString(16);
    return h.length === 1 ? `0${h}` : h;
  };
  return `#${hex2(r2)}${hex2(g)}${hex2(b)}${a < 1 ? hex2(Math.round(a * 255)) : ""}`;
}

// node_modules/@chakra-ui/theme-tools/dist/chunk-6IC2I3BY.mjs
function dlv_es_default(t2, e, l, n, r2) {
  for (e = e.split ? e.split(".") : e, n = 0; n < e.length; n++)
    t2 = t2 ? t2[e[n]] : r2;
  return t2 === r2 ? l : t2;
}
var isEmptyObject = (obj) => Object.keys(obj).length === 0;
var getColor = (theme2, color3, fallback) => {
  const hex2 = dlv_es_default(theme2, `colors.${color3}`, color3);
  try {
    toHex(hex2);
    return hex2;
  } catch {
    return fallback != null ? fallback : "#000000";
  }
};
var getBrightness = (color3) => {
  const [r2, g, b] = parseToRgba(color3);
  return (r2 * 299 + g * 587 + b * 114) / 1e3;
};
var tone = (color3) => (theme2) => {
  const hex2 = getColor(theme2, color3);
  const brightness = getBrightness(hex2);
  const isDark2 = brightness < 128;
  return isDark2 ? "dark" : "light";
};
var isDark = (color3) => (theme2) => tone(color3)(theme2) === "dark";
var transparentize2 = (color3, opacity) => (theme2) => {
  const raw = getColor(theme2, color3);
  return transparentize(raw, 1 - opacity);
};
function generateStripe(size2 = "1rem", color3 = "rgba(255, 255, 255, 0.15)") {
  return {
    backgroundImage: `linear-gradient(
    45deg,
    ${color3} 25%,
    transparent 25%,
    transparent 50%,
    ${color3} 50%,
    ${color3} 75%,
    transparent 75%,
    transparent
  )`,
    backgroundSize: `${size2} ${size2}`
  };
}
var randomHex = () => `#${Math.floor(Math.random() * 16777215).toString(16).padEnd(6, "0")}`;
function randomColor(opts) {
  const fallback = randomHex();
  if (!opts || isEmptyObject(opts)) {
    return fallback;
  }
  if (opts.string && opts.colors) {
    return randomColorFromList(opts.string, opts.colors);
  }
  if (opts.string && !opts.colors) {
    return randomColorFromString(opts.string);
  }
  if (opts.colors && !opts.string) {
    return randomFromList(opts.colors);
  }
  return fallback;
}
function randomColorFromString(str) {
  let hash4 = 0;
  if (str.length === 0)
    return hash4.toString();
  for (let i = 0; i < str.length; i += 1) {
    hash4 = str.charCodeAt(i) + ((hash4 << 5) - hash4);
    hash4 = hash4 & hash4;
  }
  let color3 = "#";
  for (let j = 0; j < 3; j += 1) {
    const value = hash4 >> j * 8 & 255;
    color3 += `00${value.toString(16)}`.substr(-2);
  }
  return color3;
}
function randomColorFromList(str, list2) {
  let index2 = 0;
  if (str.length === 0)
    return list2[0];
  for (let i = 0; i < str.length; i += 1) {
    index2 = str.charCodeAt(i) + ((index2 << 5) - index2);
    index2 = index2 & index2;
  }
  index2 = (index2 % list2.length + list2.length) % list2.length;
  return list2[index2];
}
function randomFromList(list2) {
  return list2[Math.floor(Math.random() * list2.length)];
}

// node_modules/@chakra-ui/theme-tools/dist/chunk-FNB7ZWWX.mjs
function mode(light, dark) {
  return (props) => props.colorMode === "dark" ? dark : light;
}
function orient(options) {
  const { orientation, vertical, horizontal } = options;
  if (!orientation)
    return {};
  return orientation === "vertical" ? vertical : horizontal;
}

// node_modules/@chakra-ui/theme-tools/dist/chunk-XMZHFSTS.mjs
function toRef(operand) {
  if (isObject(operand) && operand.reference) {
    return operand.reference;
  }
  return String(operand);
}
var toExpr = (operator, ...operands) => operands.map(toRef).join(` ${operator} `).replace(/calc/g, "");
var add2 = (...operands) => `calc(${toExpr("+", ...operands)})`;
var subtract3 = (...operands) => `calc(${toExpr("-", ...operands)})`;
var multiply2 = (...operands) => `calc(${toExpr("*", ...operands)})`;
var divide2 = (...operands) => `calc(${toExpr("/", ...operands)})`;
var negate2 = (x) => {
  const value = toRef(x);
  if (value != null && !Number.isNaN(parseFloat(value))) {
    return String(value).startsWith("-") ? String(value).slice(1) : `-${value}`;
  }
  return multiply2(value, -1);
};
var calc2 = Object.assign(
  (x) => ({
    add: (...operands) => calc2(add2(x, ...operands)),
    subtract: (...operands) => calc2(subtract3(x, ...operands)),
    multiply: (...operands) => calc2(multiply2(x, ...operands)),
    divide: (...operands) => calc2(divide2(x, ...operands)),
    negate: () => calc2(negate2(x)),
    toString: () => x.toString()
  }),
  {
    add: add2,
    subtract: subtract3,
    multiply: multiply2,
    divide: divide2,
    negate: negate2
  }
);

// node_modules/@chakra-ui/theme-tools/dist/chunk-WSAJBJJ4.mjs
function isDecimal(value) {
  return !Number.isInteger(parseFloat(value.toString()));
}
function replaceWhiteSpace2(value, replaceValue = "-") {
  return value.replace(/\s+/g, replaceValue);
}
function escape2(value) {
  const valueStr = replaceWhiteSpace2(value.toString());
  if (valueStr.includes("\\."))
    return value;
  return isDecimal(value) ? valueStr.replace(".", `\\.`) : value;
}
function addPrefix2(value, prefix = "") {
  return [prefix, escape2(value)].filter(Boolean).join("-");
}
function toVarRef(name, fallback) {
  return `var(${escape2(name)}${fallback ? `, ${fallback}` : ""})`;
}
function toVar(value, prefix = "") {
  return `--${addPrefix2(value, prefix)}`;
}
function cssVar2(name, options) {
  const cssVariable = toVar(name, options == null ? void 0 : options.prefix);
  return {
    variable: cssVariable,
    reference: toVarRef(cssVariable, getFallback(options == null ? void 0 : options.fallback))
  };
}
function getFallback(fallback) {
  if (typeof fallback === "string")
    return fallback;
  return fallback == null ? void 0 : fallback.reference;
}

// node_modules/@chakra-ui/theme/dist/chunk-SG67NFYS.mjs
var { defineMultiStyleConfig: defineMultiStyleConfig2, definePartsStyle: definePartsStyle2 } = createMultiStyleConfigHelpers(switchAnatomy.keys);
var $width = cssVar2("switch-track-width");
var $height = cssVar2("switch-track-height");
var $diff = cssVar2("switch-track-diff");
var diffValue = calc2.subtract($width, $height);
var $translateX = cssVar2("switch-thumb-x");
var $bg = cssVar2("switch-bg");
var baseStyleTrack = defineStyle((props) => {
  const { colorScheme: c } = props;
  return {
    borderRadius: "full",
    p: "0.5",
    width: [$width.reference],
    height: [$height.reference],
    transitionProperty: "common",
    transitionDuration: "fast",
    [$bg.variable]: "colors.gray.300",
    _dark: {
      [$bg.variable]: "colors.whiteAlpha.400"
    },
    _focusVisible: {
      boxShadow: "outline"
    },
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed"
    },
    _checked: {
      [$bg.variable]: `colors.${c}.500`,
      _dark: {
        [$bg.variable]: `colors.${c}.200`
      }
    },
    bg: $bg.reference
  };
});
var baseStyleThumb = defineStyle({
  bg: "white",
  transitionProperty: "transform",
  transitionDuration: "normal",
  borderRadius: "inherit",
  width: [$height.reference],
  height: [$height.reference],
  _checked: {
    transform: `translateX(${$translateX.reference})`
  }
});
var baseStyle2 = definePartsStyle2((props) => ({
  container: {
    [$diff.variable]: diffValue,
    [$translateX.variable]: $diff.reference,
    _rtl: {
      [$translateX.variable]: calc2($diff).negate().toString()
    }
  },
  track: baseStyleTrack(props),
  thumb: baseStyleThumb
}));
var sizes2 = {
  sm: definePartsStyle2({
    container: {
      [$width.variable]: "1.375rem",
      [$height.variable]: "sizes.3"
    }
  }),
  md: definePartsStyle2({
    container: {
      [$width.variable]: "1.875rem",
      [$height.variable]: "sizes.4"
    }
  }),
  lg: definePartsStyle2({
    container: {
      [$width.variable]: "2.875rem",
      [$height.variable]: "sizes.6"
    }
  })
};
var switchTheme = defineMultiStyleConfig2({
  baseStyle: baseStyle2,
  sizes: sizes2,
  defaultProps: {
    size: "md",
    colorScheme: "blue"
  }
});

// node_modules/@chakra-ui/theme/dist/chunk-QWN3S45W.mjs
var { defineMultiStyleConfig: defineMultiStyleConfig3, definePartsStyle: definePartsStyle3 } = createMultiStyleConfigHelpers(tableAnatomy.keys);
var baseStyle3 = definePartsStyle3({
  table: {
    fontVariantNumeric: "lining-nums tabular-nums",
    borderCollapse: "collapse",
    width: "full"
  },
  th: {
    fontFamily: "heading",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "wider",
    textAlign: "start"
  },
  td: {
    textAlign: "start"
  },
  caption: {
    mt: 4,
    fontFamily: "heading",
    textAlign: "center",
    fontWeight: "medium"
  }
});
var numericStyles = defineStyle({
  "&[data-is-numeric=true]": {
    textAlign: "end"
  }
});
var variantSimple = definePartsStyle3((props) => {
  const { colorScheme: c } = props;
  return {
    th: {
      color: mode("gray.600", "gray.400")(props),
      borderBottom: "1px",
      borderColor: mode(`${c}.100`, `${c}.700`)(props),
      ...numericStyles
    },
    td: {
      borderBottom: "1px",
      borderColor: mode(`${c}.100`, `${c}.700`)(props),
      ...numericStyles
    },
    caption: {
      color: mode("gray.600", "gray.100")(props)
    },
    tfoot: {
      tr: {
        "&:last-of-type": {
          th: { borderBottomWidth: 0 }
        }
      }
    }
  };
});
var variantStripe = definePartsStyle3((props) => {
  const { colorScheme: c } = props;
  return {
    th: {
      color: mode("gray.600", "gray.400")(props),
      borderBottom: "1px",
      borderColor: mode(`${c}.100`, `${c}.700`)(props),
      ...numericStyles
    },
    td: {
      borderBottom: "1px",
      borderColor: mode(`${c}.100`, `${c}.700`)(props),
      ...numericStyles
    },
    caption: {
      color: mode("gray.600", "gray.100")(props)
    },
    tbody: {
      tr: {
        "&:nth-of-type(odd)": {
          "th, td": {
            borderBottomWidth: "1px",
            borderColor: mode(`${c}.100`, `${c}.700`)(props)
          },
          td: {
            background: mode(`${c}.100`, `${c}.700`)(props)
          }
        }
      }
    },
    tfoot: {
      tr: {
        "&:last-of-type": {
          th: { borderBottomWidth: 0 }
        }
      }
    }
  };
});
var variants = {
  simple: variantSimple,
  striped: variantStripe,
  unstyled: defineStyle({})
};
var sizes3 = {
  sm: definePartsStyle3({
    th: {
      px: "4",
      py: "1",
      lineHeight: "4",
      fontSize: "xs"
    },
    td: {
      px: "4",
      py: "2",
      fontSize: "sm",
      lineHeight: "4"
    },
    caption: {
      px: "4",
      py: "2",
      fontSize: "xs"
    }
  }),
  md: definePartsStyle3({
    th: {
      px: "6",
      py: "3",
      lineHeight: "4",
      fontSize: "xs"
    },
    td: {
      px: "6",
      py: "4",
      lineHeight: "5"
    },
    caption: {
      px: "6",
      py: "2",
      fontSize: "sm"
    }
  }),
  lg: definePartsStyle3({
    th: {
      px: "8",
      py: "4",
      lineHeight: "5",
      fontSize: "sm"
    },
    td: {
      px: "8",
      py: "5",
      lineHeight: "6"
    },
    caption: {
      px: "6",
      py: "2",
      fontSize: "md"
    }
  })
};
var tableTheme = defineMultiStyleConfig3({
  baseStyle: baseStyle3,
  variants,
  sizes: sizes3,
  defaultProps: {
    variant: "simple",
    size: "md",
    colorScheme: "gray"
  }
});

// node_modules/@chakra-ui/theme/dist/chunk-GYISOX2E.mjs
var $fg = cssVar("tabs-color");
var $bg2 = cssVar("tabs-bg");
var $border = cssVar("tabs-border-color");
var { defineMultiStyleConfig: defineMultiStyleConfig4, definePartsStyle: definePartsStyle4 } = createMultiStyleConfigHelpers(tabsAnatomy.keys);
var baseStyleRoot = defineStyle((props) => {
  const { orientation } = props;
  return {
    display: orientation === "vertical" ? "flex" : "block"
  };
});
var baseStyleTab = defineStyle((props) => {
  const { isFitted } = props;
  return {
    flex: isFitted ? 1 : void 0,
    transitionProperty: "common",
    transitionDuration: "normal",
    _focusVisible: {
      zIndex: 1,
      boxShadow: "outline"
    },
    _disabled: {
      cursor: "not-allowed",
      opacity: 0.4
    }
  };
});
var baseStyleTablist = defineStyle((props) => {
  const { align = "start", orientation } = props;
  const alignments = {
    end: "flex-end",
    center: "center",
    start: "flex-start"
  };
  return {
    justifyContent: alignments[align],
    flexDirection: orientation === "vertical" ? "column" : "row"
  };
});
var baseStyleTabpanel = defineStyle({
  p: 4
});
var baseStyle4 = definePartsStyle4((props) => ({
  root: baseStyleRoot(props),
  tab: baseStyleTab(props),
  tablist: baseStyleTablist(props),
  tabpanel: baseStyleTabpanel
}));
var sizes4 = {
  sm: definePartsStyle4({
    tab: {
      py: 1,
      px: 4,
      fontSize: "sm"
    }
  }),
  md: definePartsStyle4({
    tab: {
      fontSize: "md",
      py: 2,
      px: 4
    }
  }),
  lg: definePartsStyle4({
    tab: {
      fontSize: "lg",
      py: 3,
      px: 4
    }
  })
};
var variantLine = definePartsStyle4((props) => {
  const { colorScheme: c, orientation } = props;
  const isVertical = orientation === "vertical";
  const borderProp = isVertical ? "borderStart" : "borderBottom";
  const marginProp = isVertical ? "marginStart" : "marginBottom";
  return {
    tablist: {
      [borderProp]: "2px solid",
      borderColor: "inherit"
    },
    tab: {
      [borderProp]: "2px solid",
      borderColor: "transparent",
      [marginProp]: "-2px",
      _selected: {
        [$fg.variable]: `colors.${c}.600`,
        _dark: {
          [$fg.variable]: `colors.${c}.300`
        },
        borderColor: "currentColor"
      },
      _active: {
        [$bg2.variable]: "colors.gray.200",
        _dark: {
          [$bg2.variable]: "colors.whiteAlpha.300"
        }
      },
      _disabled: {
        _active: { bg: "none" }
      },
      color: $fg.reference,
      bg: $bg2.reference
    }
  };
});
var variantEnclosed = definePartsStyle4((props) => {
  const { colorScheme: c } = props;
  return {
    tab: {
      borderTopRadius: "md",
      border: "1px solid",
      borderColor: "transparent",
      mb: "-1px",
      [$border.variable]: "transparent",
      _selected: {
        [$fg.variable]: `colors.${c}.600`,
        [$border.variable]: `colors.white`,
        _dark: {
          [$fg.variable]: `colors.${c}.300`,
          [$border.variable]: `colors.gray.800`
        },
        borderColor: "inherit",
        borderBottomColor: $border.reference
      },
      color: $fg.reference
    },
    tablist: {
      mb: "-1px",
      borderBottom: "1px solid",
      borderColor: "inherit"
    }
  };
});
var variantEnclosedColored = definePartsStyle4((props) => {
  const { colorScheme: c } = props;
  return {
    tab: {
      border: "1px solid",
      borderColor: "inherit",
      [$bg2.variable]: "colors.gray.50",
      _dark: {
        [$bg2.variable]: "colors.whiteAlpha.50"
      },
      mb: "-1px",
      _notLast: {
        marginEnd: "-1px"
      },
      _selected: {
        [$bg2.variable]: "colors.white",
        [$fg.variable]: `colors.${c}.600`,
        _dark: {
          [$bg2.variable]: "colors.gray.800",
          [$fg.variable]: `colors.${c}.300`
        },
        borderColor: "inherit",
        borderTopColor: "currentColor",
        borderBottomColor: "transparent"
      },
      color: $fg.reference,
      bg: $bg2.reference
    },
    tablist: {
      mb: "-1px",
      borderBottom: "1px solid",
      borderColor: "inherit"
    }
  };
});
var variantSoftRounded = definePartsStyle4((props) => {
  const { colorScheme: c, theme: theme2 } = props;
  return {
    tab: {
      borderRadius: "full",
      fontWeight: "semibold",
      color: "gray.600",
      _selected: {
        color: getColor(theme2, `${c}.700`),
        bg: getColor(theme2, `${c}.100`)
      }
    }
  };
});
var variantSolidRounded = definePartsStyle4((props) => {
  const { colorScheme: c } = props;
  return {
    tab: {
      borderRadius: "full",
      fontWeight: "semibold",
      [$fg.variable]: "colors.gray.600",
      _dark: {
        [$fg.variable]: "inherit"
      },
      _selected: {
        [$fg.variable]: "colors.white",
        [$bg2.variable]: `colors.${c}.600`,
        _dark: {
          [$fg.variable]: "colors.gray.800",
          [$bg2.variable]: `colors.${c}.300`
        }
      },
      color: $fg.reference,
      bg: $bg2.reference
    }
  };
});
var variantUnstyled = definePartsStyle4({});
var variants2 = {
  line: variantLine,
  enclosed: variantEnclosed,
  "enclosed-colored": variantEnclosedColored,
  "soft-rounded": variantSoftRounded,
  "solid-rounded": variantSolidRounded,
  unstyled: variantUnstyled
};
var tabsTheme = defineMultiStyleConfig4({
  baseStyle: baseStyle4,
  sizes: sizes4,
  variants: variants2,
  defaultProps: {
    size: "md",
    variant: "line",
    colorScheme: "blue"
  }
});

// node_modules/@chakra-ui/theme/dist/chunk-ZQMLTFF3.mjs
var vars = defineCssVars("badge", ["bg", "color", "shadow"]);
var baseStyle5 = defineStyle({
  px: 1,
  textTransform: "uppercase",
  fontSize: "xs",
  borderRadius: "sm",
  fontWeight: "bold",
  bg: vars.bg.reference,
  color: vars.color.reference,
  boxShadow: vars.shadow.reference
});
var variantSolid = defineStyle((props) => {
  const { colorScheme: c, theme: theme2 } = props;
  const dark = transparentize2(`${c}.500`, 0.6)(theme2);
  return {
    [vars.bg.variable]: `colors.${c}.500`,
    [vars.color.variable]: `colors.white`,
    _dark: {
      [vars.bg.variable]: dark,
      [vars.color.variable]: `colors.whiteAlpha.800`
    }
  };
});
var variantSubtle = defineStyle((props) => {
  const { colorScheme: c, theme: theme2 } = props;
  const darkBg = transparentize2(`${c}.200`, 0.16)(theme2);
  return {
    [vars.bg.variable]: `colors.${c}.100`,
    [vars.color.variable]: `colors.${c}.800`,
    _dark: {
      [vars.bg.variable]: darkBg,
      [vars.color.variable]: `colors.${c}.200`
    }
  };
});
var variantOutline = defineStyle((props) => {
  const { colorScheme: c, theme: theme2 } = props;
  const darkColor = transparentize2(`${c}.200`, 0.8)(theme2);
  return {
    [vars.color.variable]: `colors.${c}.500`,
    _dark: {
      [vars.color.variable]: darkColor
    },
    [vars.shadow.variable]: `inset 0 0 0px 1px ${vars.color.reference}`
  };
});
var variants3 = {
  solid: variantSolid,
  subtle: variantSubtle,
  outline: variantOutline
};
var badgeTheme = defineStyleConfig({
  baseStyle: baseStyle5,
  variants: variants3,
  defaultProps: {
    variant: "subtle",
    colorScheme: "gray"
  }
});

// node_modules/@chakra-ui/theme/dist/chunk-7RVLYCMR.mjs
var { defineMultiStyleConfig: defineMultiStyleConfig5, definePartsStyle: definePartsStyle5 } = createMultiStyleConfigHelpers(tagAnatomy.keys);
var $bg3 = cssVar("tag-bg");
var $color = cssVar("tag-color");
var $shadow = cssVar("tag-shadow");
var $minH = cssVar("tag-min-height");
var $minW = cssVar("tag-min-width");
var $fontSize = cssVar("tag-font-size");
var $paddingX = cssVar("tag-padding-inline");
var baseStyleContainer = defineStyle({
  fontWeight: "medium",
  lineHeight: 1.2,
  outline: 0,
  [$color.variable]: vars.color.reference,
  [$bg3.variable]: vars.bg.reference,
  [$shadow.variable]: vars.shadow.reference,
  color: $color.reference,
  bg: $bg3.reference,
  boxShadow: $shadow.reference,
  borderRadius: "md",
  minH: $minH.reference,
  minW: $minW.reference,
  fontSize: $fontSize.reference,
  px: $paddingX.reference,
  _focusVisible: {
    [$shadow.variable]: "shadows.outline"
  }
});
var baseStyleLabel = defineStyle({
  lineHeight: 1.2,
  overflow: "visible"
});
var baseStyleCloseButton = defineStyle({
  fontSize: "lg",
  w: "5",
  h: "5",
  transitionProperty: "common",
  transitionDuration: "normal",
  borderRadius: "full",
  marginStart: "1.5",
  marginEnd: "-1",
  opacity: 0.5,
  _disabled: {
    opacity: 0.4
  },
  _focusVisible: {
    boxShadow: "outline",
    bg: "rgba(0, 0, 0, 0.14)"
  },
  _hover: {
    opacity: 0.8
  },
  _active: {
    opacity: 1
  }
});
var baseStyle6 = definePartsStyle5({
  container: baseStyleContainer,
  label: baseStyleLabel,
  closeButton: baseStyleCloseButton
});
var sizes5 = {
  sm: definePartsStyle5({
    container: {
      [$minH.variable]: "sizes.5",
      [$minW.variable]: "sizes.5",
      [$fontSize.variable]: "fontSizes.xs",
      [$paddingX.variable]: "space.2"
    },
    closeButton: {
      marginEnd: "-2px",
      marginStart: "0.35rem"
    }
  }),
  md: definePartsStyle5({
    container: {
      [$minH.variable]: "sizes.6",
      [$minW.variable]: "sizes.6",
      [$fontSize.variable]: "fontSizes.sm",
      [$paddingX.variable]: "space.2"
    }
  }),
  lg: definePartsStyle5({
    container: {
      [$minH.variable]: "sizes.8",
      [$minW.variable]: "sizes.8",
      [$fontSize.variable]: "fontSizes.md",
      [$paddingX.variable]: "space.3"
    }
  })
};
var variants4 = {
  subtle: definePartsStyle5((props) => {
    var _a7;
    return {
      container: (_a7 = badgeTheme.variants) == null ? void 0 : _a7.subtle(props)
    };
  }),
  solid: definePartsStyle5((props) => {
    var _a7;
    return {
      container: (_a7 = badgeTheme.variants) == null ? void 0 : _a7.solid(props)
    };
  }),
  outline: definePartsStyle5((props) => {
    var _a7;
    return {
      container: (_a7 = badgeTheme.variants) == null ? void 0 : _a7.outline(props)
    };
  })
};
var tagTheme = defineMultiStyleConfig5({
  variants: variants4,
  baseStyle: baseStyle6,
  sizes: sizes5,
  defaultProps: {
    size: "md",
    variant: "subtle",
    colorScheme: "gray"
  }
});

// node_modules/@chakra-ui/theme/dist/chunk-ICL3HPTT.mjs
var { definePartsStyle: definePartsStyle6, defineMultiStyleConfig: defineMultiStyleConfig6 } = createMultiStyleConfigHelpers(inputAnatomy.keys);
var $height2 = cssVar("input-height");
var $fontSize2 = cssVar("input-font-size");
var $padding = cssVar("input-padding");
var $borderRadius = cssVar("input-border-radius");
var baseStyle7 = definePartsStyle6({
  addon: {
    height: $height2.reference,
    fontSize: $fontSize2.reference,
    px: $padding.reference,
    borderRadius: $borderRadius.reference
  },
  field: {
    width: "100%",
    height: $height2.reference,
    fontSize: $fontSize2.reference,
    px: $padding.reference,
    borderRadius: $borderRadius.reference,
    minWidth: 0,
    outline: 0,
    position: "relative",
    appearance: "none",
    transitionProperty: "common",
    transitionDuration: "normal",
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed"
    }
  }
});
var size = {
  lg: defineStyle({
    [$fontSize2.variable]: "fontSizes.lg",
    [$padding.variable]: "space.4",
    [$borderRadius.variable]: "radii.md",
    [$height2.variable]: "sizes.12"
  }),
  md: defineStyle({
    [$fontSize2.variable]: "fontSizes.md",
    [$padding.variable]: "space.4",
    [$borderRadius.variable]: "radii.md",
    [$height2.variable]: "sizes.10"
  }),
  sm: defineStyle({
    [$fontSize2.variable]: "fontSizes.sm",
    [$padding.variable]: "space.3",
    [$borderRadius.variable]: "radii.sm",
    [$height2.variable]: "sizes.8"
  }),
  xs: defineStyle({
    [$fontSize2.variable]: "fontSizes.xs",
    [$padding.variable]: "space.2",
    [$borderRadius.variable]: "radii.sm",
    [$height2.variable]: "sizes.6"
  })
};
var sizes6 = {
  lg: definePartsStyle6({
    field: size.lg,
    group: size.lg
  }),
  md: definePartsStyle6({
    field: size.md,
    group: size.md
  }),
  sm: definePartsStyle6({
    field: size.sm,
    group: size.sm
  }),
  xs: definePartsStyle6({
    field: size.xs,
    group: size.xs
  })
};
function getDefaults(props) {
  const { focusBorderColor: fc, errorBorderColor: ec } = props;
  return {
    focusBorderColor: fc || mode("blue.500", "blue.300")(props),
    errorBorderColor: ec || mode("red.500", "red.300")(props)
  };
}
var variantOutline2 = definePartsStyle6((props) => {
  const { theme: theme2 } = props;
  const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props);
  return {
    field: {
      border: "1px solid",
      borderColor: "inherit",
      bg: "inherit",
      _hover: {
        borderColor: mode("gray.300", "whiteAlpha.400")(props)
      },
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all"
      },
      _invalid: {
        borderColor: getColor(theme2, ec),
        boxShadow: `0 0 0 1px ${getColor(theme2, ec)}`
      },
      _focusVisible: {
        zIndex: 1,
        borderColor: getColor(theme2, fc),
        boxShadow: `0 0 0 1px ${getColor(theme2, fc)}`
      }
    },
    addon: {
      border: "1px solid",
      borderColor: mode("inherit", "whiteAlpha.50")(props),
      bg: mode("gray.100", "whiteAlpha.300")(props)
    }
  };
});
var variantFilled = definePartsStyle6((props) => {
  const { theme: theme2 } = props;
  const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props);
  return {
    field: {
      border: "2px solid",
      borderColor: "transparent",
      bg: mode("gray.100", "whiteAlpha.50")(props),
      _hover: {
        bg: mode("gray.200", "whiteAlpha.100")(props)
      },
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all"
      },
      _invalid: {
        borderColor: getColor(theme2, ec)
      },
      _focusVisible: {
        bg: "transparent",
        borderColor: getColor(theme2, fc)
      }
    },
    addon: {
      border: "2px solid",
      borderColor: "transparent",
      bg: mode("gray.100", "whiteAlpha.50")(props)
    }
  };
});
var variantFlushed = definePartsStyle6((props) => {
  const { theme: theme2 } = props;
  const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props);
  return {
    field: {
      borderBottom: "1px solid",
      borderColor: "inherit",
      borderRadius: "0",
      px: "0",
      bg: "transparent",
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all"
      },
      _invalid: {
        borderColor: getColor(theme2, ec),
        boxShadow: `0px 1px 0px 0px ${getColor(theme2, ec)}`
      },
      _focusVisible: {
        borderColor: getColor(theme2, fc),
        boxShadow: `0px 1px 0px 0px ${getColor(theme2, fc)}`
      }
    },
    addon: {
      borderBottom: "2px solid",
      borderColor: "inherit",
      borderRadius: "0",
      px: "0",
      bg: "transparent"
    }
  };
});
var variantUnstyled2 = definePartsStyle6({
  field: {
    bg: "transparent",
    px: "0",
    height: "auto"
  },
  addon: {
    bg: "transparent",
    px: "0",
    height: "auto"
  }
});
var variants5 = {
  outline: variantOutline2,
  filled: variantFilled,
  flushed: variantFlushed,
  unstyled: variantUnstyled2
};
var inputTheme = defineMultiStyleConfig6({
  baseStyle: baseStyle7,
  sizes: sizes6,
  variants: variants5,
  defaultProps: {
    size: "md",
    variant: "outline"
  }
});

// node_modules/@chakra-ui/theme/dist/chunk-KJ26FGJD.mjs
var _a;
var baseStyle8 = defineStyle({
  ...(_a = inputTheme.baseStyle) == null ? void 0 : _a.field,
  paddingY: "2",
  minHeight: "20",
  lineHeight: "short",
  verticalAlign: "top"
});
var _a2;
var _b;
var variants6 = {
  outline: defineStyle(
    (props) => {
      var _a42, _b32;
      return (_b32 = (_a42 = inputTheme.variants) == null ? void 0 : _a42.outline(props).field) != null ? _b32 : {};
    }
  ),
  flushed: defineStyle(
    (props) => {
      var _a42, _b32;
      return (_b32 = (_a42 = inputTheme.variants) == null ? void 0 : _a42.flushed(props).field) != null ? _b32 : {};
    }
  ),
  filled: defineStyle(
    (props) => {
      var _a42, _b32;
      return (_b32 = (_a42 = inputTheme.variants) == null ? void 0 : _a42.filled(props).field) != null ? _b32 : {};
    }
  ),
  unstyled: (_b = (_a2 = inputTheme.variants) == null ? void 0 : _a2.unstyled.field) != null ? _b : {}
};
var _a3;
var _b2;
var _c;
var _d;
var _e;
var _f;
var _g;
var _h;
var sizes7 = {
  xs: (_b2 = (_a3 = inputTheme.sizes) == null ? void 0 : _a3.xs.field) != null ? _b2 : {},
  sm: (_d = (_c = inputTheme.sizes) == null ? void 0 : _c.sm.field) != null ? _d : {},
  md: (_f = (_e = inputTheme.sizes) == null ? void 0 : _e.md.field) != null ? _f : {},
  lg: (_h = (_g = inputTheme.sizes) == null ? void 0 : _g.lg.field) != null ? _h : {}
};
var textareaTheme = defineStyleConfig({
  baseStyle: baseStyle8,
  sizes: sizes7,
  variants: variants6,
  defaultProps: {
    size: "md",
    variant: "outline"
  }
});

// node_modules/@chakra-ui/theme/dist/chunk-R7ZISUMV.mjs
var $bg4 = cssVar2("tooltip-bg");
var $fg2 = cssVar2("tooltip-fg");
var $arrowBg = cssVar2("popper-arrow-bg");
var baseStyle9 = defineStyle({
  bg: $bg4.reference,
  color: $fg2.reference,
  [$bg4.variable]: "colors.gray.700",
  [$fg2.variable]: "colors.whiteAlpha.900",
  _dark: {
    [$bg4.variable]: "colors.gray.300",
    [$fg2.variable]: "colors.gray.900"
  },
  [$arrowBg.variable]: $bg4.reference,
  px: "2",
  py: "0.5",
  borderRadius: "sm",
  fontWeight: "medium",
  fontSize: "sm",
  boxShadow: "md",
  maxW: "xs",
  zIndex: "tooltip"
});
var tooltipTheme = defineStyleConfig({
  baseStyle: baseStyle9
});

// node_modules/@chakra-ui/theme/dist/chunk-37MNRBP2.mjs
var { defineMultiStyleConfig: defineMultiStyleConfig7, definePartsStyle: definePartsStyle7 } = createMultiStyleConfigHelpers(progressAnatomy.keys);
var filledStyle = defineStyle((props) => {
  const { colorScheme: c, theme: t2, isIndeterminate, hasStripe } = props;
  const stripeStyle = mode(
    generateStripe(),
    generateStripe("1rem", "rgba(0,0,0,0.1)")
  )(props);
  const bgColor = mode(`${c}.500`, `${c}.200`)(props);
  const gradient = `linear-gradient(
    to right,
    transparent 0%,
    ${getColor(t2, bgColor)} 50%,
    transparent 100%
  )`;
  const addStripe = !isIndeterminate && hasStripe;
  return {
    ...addStripe && stripeStyle,
    ...isIndeterminate ? { bgImage: gradient } : { bgColor }
  };
});
var baseStyleLabel2 = defineStyle({
  lineHeight: "1",
  fontSize: "0.25em",
  fontWeight: "bold",
  color: "white"
});
var baseStyleTrack2 = defineStyle((props) => {
  return {
    bg: mode("gray.100", "whiteAlpha.300")(props)
  };
});
var baseStyleFilledTrack = defineStyle((props) => {
  return {
    transitionProperty: "common",
    transitionDuration: "slow",
    ...filledStyle(props)
  };
});
var baseStyle10 = definePartsStyle7((props) => ({
  label: baseStyleLabel2,
  filledTrack: baseStyleFilledTrack(props),
  track: baseStyleTrack2(props)
}));
var sizes8 = {
  xs: definePartsStyle7({
    track: { h: "1" }
  }),
  sm: definePartsStyle7({
    track: { h: "2" }
  }),
  md: definePartsStyle7({
    track: { h: "3" }
  }),
  lg: definePartsStyle7({
    track: { h: "4" }
  })
};
var progressTheme = defineMultiStyleConfig7({
  sizes: sizes8,
  baseStyle: baseStyle10,
  defaultProps: {
    size: "md",
    colorScheme: "blue"
  }
});

// node_modules/@chakra-ui/theme/dist/chunk-UV3F75RF.mjs
var isFunction2 = (value) => typeof value === "function";
function runIfFn2(valueOrFn, ...args) {
  return isFunction2(valueOrFn) ? valueOrFn(...args) : valueOrFn;
}

// node_modules/@chakra-ui/theme/dist/chunk-XHYVH6UO.mjs
var { definePartsStyle: definePartsStyle8, defineMultiStyleConfig: defineMultiStyleConfig8 } = createMultiStyleConfigHelpers(checkboxAnatomy.keys);
var $size2 = cssVar("checkbox-size");
var baseStyleControl = defineStyle((props) => {
  const { colorScheme: c } = props;
  return {
    w: $size2.reference,
    h: $size2.reference,
    transitionProperty: "box-shadow",
    transitionDuration: "normal",
    border: "2px solid",
    borderRadius: "sm",
    borderColor: "inherit",
    color: "white",
    _checked: {
      bg: mode(`${c}.500`, `${c}.200`)(props),
      borderColor: mode(`${c}.500`, `${c}.200`)(props),
      color: mode("white", "gray.900")(props),
      _hover: {
        bg: mode(`${c}.600`, `${c}.300`)(props),
        borderColor: mode(`${c}.600`, `${c}.300`)(props)
      },
      _disabled: {
        borderColor: mode("gray.200", "transparent")(props),
        bg: mode("gray.200", "whiteAlpha.300")(props),
        color: mode("gray.500", "whiteAlpha.500")(props)
      }
    },
    _indeterminate: {
      bg: mode(`${c}.500`, `${c}.200`)(props),
      borderColor: mode(`${c}.500`, `${c}.200`)(props),
      color: mode("white", "gray.900")(props)
    },
    _disabled: {
      bg: mode("gray.100", "whiteAlpha.100")(props),
      borderColor: mode("gray.100", "transparent")(props)
    },
    _focusVisible: {
      boxShadow: "outline"
    },
    _invalid: {
      borderColor: mode("red.500", "red.300")(props)
    }
  };
});
var baseStyleContainer2 = defineStyle({
  _disabled: { cursor: "not-allowed" }
});
var baseStyleLabel3 = defineStyle({
  userSelect: "none",
  _disabled: { opacity: 0.4 }
});
var baseStyleIcon = defineStyle({
  transitionProperty: "transform",
  transitionDuration: "normal"
});
var baseStyle11 = definePartsStyle8((props) => ({
  icon: baseStyleIcon,
  container: baseStyleContainer2,
  control: runIfFn2(baseStyleControl, props),
  label: baseStyleLabel3
}));
var sizes9 = {
  sm: definePartsStyle8({
    control: { [$size2.variable]: "sizes.3" },
    label: { fontSize: "sm" },
    icon: { fontSize: "3xs" }
  }),
  md: definePartsStyle8({
    control: { [$size2.variable]: "sizes.4" },
    label: { fontSize: "md" },
    icon: { fontSize: "2xs" }
  }),
  lg: definePartsStyle8({
    control: { [$size2.variable]: "sizes.5" },
    label: { fontSize: "lg" },
    icon: { fontSize: "2xs" }
  })
};
var checkboxTheme = defineMultiStyleConfig8({
  baseStyle: baseStyle11,
  sizes: sizes9,
  defaultProps: {
    size: "md",
    colorScheme: "blue"
  }
});

// node_modules/@chakra-ui/theme/dist/chunk-VZUATZ4E.mjs
var { defineMultiStyleConfig: defineMultiStyleConfig9, definePartsStyle: definePartsStyle9 } = createMultiStyleConfigHelpers(radioAnatomy.keys);
var baseStyleControl2 = defineStyle((props) => {
  var _a7;
  const controlStyle = (_a7 = runIfFn2(checkboxTheme.baseStyle, props)) == null ? void 0 : _a7.control;
  return {
    ...controlStyle,
    borderRadius: "full",
    _checked: {
      ...controlStyle == null ? void 0 : controlStyle["_checked"],
      _before: {
        content: `""`,
        display: "inline-block",
        pos: "relative",
        w: "50%",
        h: "50%",
        borderRadius: "50%",
        bg: "currentColor"
      }
    }
  };
});
var baseStyle12 = definePartsStyle9((props) => {
  var _a7, _b5, _c3, _d3;
  return {
    label: (_b5 = (_a7 = checkboxTheme).baseStyle) == null ? void 0 : _b5.call(_a7, props).label,
    container: (_d3 = (_c3 = checkboxTheme).baseStyle) == null ? void 0 : _d3.call(_c3, props).container,
    control: baseStyleControl2(props)
  };
});
var sizes10 = {
  md: definePartsStyle9({
    control: { w: "4", h: "4" },
    label: { fontSize: "md" }
  }),
  lg: definePartsStyle9({
    control: { w: "5", h: "5" },
    label: { fontSize: "lg" }
  }),
  sm: definePartsStyle9({
    control: { width: "3", height: "3" },
    label: { fontSize: "sm" }
  })
};
var radioTheme = defineMultiStyleConfig9({
  baseStyle: baseStyle12,
  sizes: sizes10,
  defaultProps: {
    size: "md",
    colorScheme: "blue"
  }
});

// node_modules/@chakra-ui/theme/dist/chunk-NNA4E64A.mjs
var { defineMultiStyleConfig: defineMultiStyleConfig10, definePartsStyle: definePartsStyle10 } = createMultiStyleConfigHelpers(selectAnatomy.keys);
var $bg5 = cssVar("select-bg");
var _a4;
var baseStyleField = defineStyle({
  ...(_a4 = inputTheme.baseStyle) == null ? void 0 : _a4.field,
  appearance: "none",
  paddingBottom: "1px",
  lineHeight: "normal",
  bg: $bg5.reference,
  [$bg5.variable]: "colors.white",
  _dark: {
    [$bg5.variable]: "colors.gray.700"
  },
  "> option, > optgroup": {
    bg: $bg5.reference
  }
});
var baseStyleIcon2 = defineStyle({
  width: "6",
  height: "100%",
  insetEnd: "2",
  position: "relative",
  color: "currentColor",
  fontSize: "xl",
  _disabled: {
    opacity: 0.5
  }
});
var baseStyle13 = definePartsStyle10({
  field: baseStyleField,
  icon: baseStyleIcon2
});
var iconSpacing = defineStyle({
  paddingInlineEnd: "8"
});
var _a22;
var _b3;
var _c2;
var _d2;
var _e2;
var _f2;
var _g2;
var _h2;
var sizes11 = {
  lg: {
    ...(_a22 = inputTheme.sizes) == null ? void 0 : _a22.lg,
    field: {
      ...(_b3 = inputTheme.sizes) == null ? void 0 : _b3.lg.field,
      ...iconSpacing
    }
  },
  md: {
    ...(_c2 = inputTheme.sizes) == null ? void 0 : _c2.md,
    field: {
      ...(_d2 = inputTheme.sizes) == null ? void 0 : _d2.md.field,
      ...iconSpacing
    }
  },
  sm: {
    ...(_e2 = inputTheme.sizes) == null ? void 0 : _e2.sm,
    field: {
      ...(_f2 = inputTheme.sizes) == null ? void 0 : _f2.sm.field,
      ...iconSpacing
    }
  },
  xs: {
    ...(_g2 = inputTheme.sizes) == null ? void 0 : _g2.xs,
    field: {
      ...(_h2 = inputTheme.sizes) == null ? void 0 : _h2.xs.field,
      ...iconSpacing
    },
    icon: {
      insetEnd: "1"
    }
  }
};
var selectTheme = defineMultiStyleConfig10({
  baseStyle: baseStyle13,
  sizes: sizes11,
  variants: inputTheme.variants,
  defaultProps: inputTheme.defaultProps
});

// node_modules/@chakra-ui/theme/dist/chunk-X6XFE4TF.mjs
var $startColor = cssVar("skeleton-start-color");
var $endColor = cssVar("skeleton-end-color");
var baseStyle14 = defineStyle({
  [$startColor.variable]: "colors.gray.100",
  [$endColor.variable]: "colors.gray.400",
  _dark: {
    [$startColor.variable]: "colors.gray.800",
    [$endColor.variable]: "colors.gray.600"
  },
  background: $startColor.reference,
  borderColor: $endColor.reference,
  opacity: 0.7,
  borderRadius: "sm"
});
var skeletonTheme = defineStyleConfig({
  baseStyle: baseStyle14
});

// node_modules/@chakra-ui/theme/dist/chunk-ZREGO6US.mjs
var $bg6 = cssVar("skip-link-bg");
var baseStyle15 = defineStyle({
  borderRadius: "md",
  fontWeight: "semibold",
  _focusVisible: {
    boxShadow: "outline",
    padding: "4",
    position: "fixed",
    top: "6",
    insetStart: "6",
    [$bg6.variable]: "colors.white",
    _dark: {
      [$bg6.variable]: "colors.gray.700"
    },
    bg: $bg6.reference
  }
});
var skipLinkTheme = defineStyleConfig({
  baseStyle: baseStyle15
});

// node_modules/@chakra-ui/theme/dist/chunk-5FA7Y3RP.mjs
var { defineMultiStyleConfig: defineMultiStyleConfig11, definePartsStyle: definePartsStyle11 } = createMultiStyleConfigHelpers(sliderAnatomy.keys);
var $thumbSize = cssVar("slider-thumb-size");
var $trackSize = cssVar("slider-track-size");
var $bg7 = cssVar("slider-bg");
var baseStyleContainer3 = defineStyle((props) => {
  const { orientation } = props;
  return {
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    _disabled: {
      opacity: 0.6,
      cursor: "default",
      pointerEvents: "none"
    },
    ...orient({
      orientation,
      vertical: { h: "100%" },
      horizontal: { w: "100%" }
    })
  };
});
var baseStyleTrack3 = defineStyle((props) => {
  const orientationStyles = orient({
    orientation: props.orientation,
    horizontal: { h: $trackSize.reference },
    vertical: { w: $trackSize.reference }
  });
  return {
    ...orientationStyles,
    overflow: "hidden",
    borderRadius: "sm",
    [$bg7.variable]: "colors.gray.200",
    _dark: {
      [$bg7.variable]: "colors.whiteAlpha.200"
    },
    _disabled: {
      [$bg7.variable]: "colors.gray.300",
      _dark: {
        [$bg7.variable]: "colors.whiteAlpha.300"
      }
    },
    bg: $bg7.reference
  };
});
var baseStyleThumb2 = defineStyle((props) => {
  const { orientation } = props;
  const orientationStyle = orient({
    orientation,
    vertical: {
      left: "50%",
      transform: `translateX(-50%)`,
      _active: {
        transform: `translateX(-50%) scale(1.15)`
      }
    },
    horizontal: {
      top: "50%",
      transform: `translateY(-50%)`,
      _active: {
        transform: `translateY(-50%) scale(1.15)`
      }
    }
  });
  return {
    ...orientationStyle,
    w: $thumbSize.reference,
    h: $thumbSize.reference,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    outline: 0,
    zIndex: 1,
    borderRadius: "full",
    bg: "white",
    boxShadow: "base",
    border: "1px solid",
    borderColor: "transparent",
    transitionProperty: "transform",
    transitionDuration: "normal",
    _focusVisible: {
      boxShadow: "outline"
    },
    _disabled: {
      bg: "gray.300"
    }
  };
});
var baseStyleFilledTrack2 = defineStyle((props) => {
  const { colorScheme: c } = props;
  return {
    width: "inherit",
    height: "inherit",
    [$bg7.variable]: `colors.${c}.500`,
    _dark: {
      [$bg7.variable]: `colors.${c}.200`
    },
    bg: $bg7.reference
  };
});
var baseStyle16 = definePartsStyle11((props) => ({
  container: baseStyleContainer3(props),
  track: baseStyleTrack3(props),
  thumb: baseStyleThumb2(props),
  filledTrack: baseStyleFilledTrack2(props)
}));
var sizeLg = definePartsStyle11({
  container: {
    [$thumbSize.variable]: `sizes.4`,
    [$trackSize.variable]: `sizes.1`
  }
});
var sizeMd = definePartsStyle11({
  container: {
    [$thumbSize.variable]: `sizes.3.5`,
    [$trackSize.variable]: `sizes.1`
  }
});
var sizeSm = definePartsStyle11({
  container: {
    [$thumbSize.variable]: `sizes.2.5`,
    [$trackSize.variable]: `sizes.0.5`
  }
});
var sizes12 = {
  lg: sizeLg,
  md: sizeMd,
  sm: sizeSm
};
var sliderTheme = defineMultiStyleConfig11({
  baseStyle: baseStyle16,
  sizes: sizes12,
  defaultProps: {
    size: "md",
    colorScheme: "blue"
  }
});

// node_modules/@chakra-ui/theme/dist/chunk-L3YAB6CV.mjs
var $size3 = cssVar2("spinner-size");
var baseStyle17 = defineStyle({
  width: [$size3.reference],
  height: [$size3.reference]
});
var sizes13 = {
  xs: defineStyle({
    [$size3.variable]: "sizes.3"
  }),
  sm: defineStyle({
    [$size3.variable]: "sizes.4"
  }),
  md: defineStyle({
    [$size3.variable]: "sizes.6"
  }),
  lg: defineStyle({
    [$size3.variable]: "sizes.8"
  }),
  xl: defineStyle({
    [$size3.variable]: "sizes.12"
  })
};
var spinnerTheme = defineStyleConfig({
  baseStyle: baseStyle17,
  sizes: sizes13,
  defaultProps: {
    size: "md"
  }
});

// node_modules/@chakra-ui/theme/dist/chunk-2KWJXISX.mjs
var { defineMultiStyleConfig: defineMultiStyleConfig12, definePartsStyle: definePartsStyle12 } = createMultiStyleConfigHelpers(statAnatomy.keys);
var baseStyleLabel4 = defineStyle({
  fontWeight: "medium"
});
var baseStyleHelpText = defineStyle({
  opacity: 0.8,
  marginBottom: "2"
});
var baseStyleNumber = defineStyle({
  verticalAlign: "baseline",
  fontWeight: "semibold"
});
var baseStyleIcon3 = defineStyle({
  marginEnd: 1,
  w: "3.5",
  h: "3.5",
  verticalAlign: "middle"
});
var baseStyle18 = definePartsStyle12({
  container: {},
  label: baseStyleLabel4,
  helpText: baseStyleHelpText,
  number: baseStyleNumber,
  icon: baseStyleIcon3
});
var sizes14 = {
  md: definePartsStyle12({
    label: { fontSize: "sm" },
    helpText: { fontSize: "sm" },
    number: { fontSize: "2xl" }
  })
};
var statTheme = defineMultiStyleConfig12({
  baseStyle: baseStyle18,
  sizes: sizes14,
  defaultProps: {
    size: "md"
  }
});

// node_modules/@chakra-ui/theme/dist/chunk-AFCBUAM5.mjs
var $bg8 = cssVar("kbd-bg");
var baseStyle19 = defineStyle({
  [$bg8.variable]: "colors.gray.100",
  _dark: {
    [$bg8.variable]: "colors.whiteAlpha.100"
  },
  bg: $bg8.reference,
  borderRadius: "md",
  borderWidth: "1px",
  borderBottomWidth: "3px",
  fontSize: "0.8em",
  fontWeight: "bold",
  lineHeight: "normal",
  px: "0.4em",
  whiteSpace: "nowrap"
});
var kbdTheme = defineStyleConfig({
  baseStyle: baseStyle19
});

// node_modules/@chakra-ui/theme/dist/chunk-V5KSHSOQ.mjs
var baseStyle20 = defineStyle({
  transitionProperty: "common",
  transitionDuration: "fast",
  transitionTimingFunction: "ease-out",
  cursor: "pointer",
  textDecoration: "none",
  outline: "none",
  color: "inherit",
  _hover: {
    textDecoration: "underline"
  },
  _focusVisible: {
    boxShadow: "outline"
  }
});
var linkTheme = defineStyleConfig({
  baseStyle: baseStyle20
});

// node_modules/@chakra-ui/theme/dist/chunk-MGNM2WZQ.mjs
var { defineMultiStyleConfig: defineMultiStyleConfig13, definePartsStyle: definePartsStyle13 } = createMultiStyleConfigHelpers(listAnatomy.keys);
var baseStyleIcon4 = defineStyle({
  marginEnd: "2",
  display: "inline",
  verticalAlign: "text-bottom"
});
var baseStyle21 = definePartsStyle13({
  icon: baseStyleIcon4
});
var listTheme = defineMultiStyleConfig13({
  baseStyle: baseStyle21
});

// node_modules/@chakra-ui/theme/dist/chunk-N2GP2AF7.mjs
var { defineMultiStyleConfig: defineMultiStyleConfig14, definePartsStyle: definePartsStyle14 } = createMultiStyleConfigHelpers(menuAnatomy.keys);
var $bg9 = cssVar("menu-bg");
var $shadow2 = cssVar("menu-shadow");
var baseStyleList = defineStyle({
  [$bg9.variable]: "#fff",
  [$shadow2.variable]: "shadows.sm",
  _dark: {
    [$bg9.variable]: "colors.gray.700",
    [$shadow2.variable]: "shadows.dark-lg"
  },
  color: "inherit",
  minW: "3xs",
  py: "2",
  zIndex: 1,
  borderRadius: "md",
  borderWidth: "1px",
  bg: $bg9.reference,
  boxShadow: $shadow2.reference
});
var baseStyleItem = defineStyle({
  py: "1.5",
  px: "3",
  transitionProperty: "background",
  transitionDuration: "ultra-fast",
  transitionTimingFunction: "ease-in",
  _focus: {
    [$bg9.variable]: "colors.gray.100",
    _dark: {
      [$bg9.variable]: "colors.whiteAlpha.100"
    }
  },
  _active: {
    [$bg9.variable]: "colors.gray.200",
    _dark: {
      [$bg9.variable]: "colors.whiteAlpha.200"
    }
  },
  _expanded: {
    [$bg9.variable]: "colors.gray.100",
    _dark: {
      [$bg9.variable]: "colors.whiteAlpha.100"
    }
  },
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed"
  },
  bg: $bg9.reference
});
var baseStyleGroupTitle = defineStyle({
  mx: 4,
  my: 2,
  fontWeight: "semibold",
  fontSize: "sm"
});
var baseStyleIcon5 = defineStyle({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0
});
var baseStyleCommand = defineStyle({
  opacity: 0.6
});
var baseStyleDivider = defineStyle({
  border: 0,
  borderBottom: "1px solid",
  borderColor: "inherit",
  my: "2",
  opacity: 0.6
});
var baseStyleButton = defineStyle({
  transitionProperty: "common",
  transitionDuration: "normal"
});
var baseStyle22 = definePartsStyle14({
  button: baseStyleButton,
  list: baseStyleList,
  item: baseStyleItem,
  groupTitle: baseStyleGroupTitle,
  icon: baseStyleIcon5,
  command: baseStyleCommand,
  divider: baseStyleDivider
});
var menuTheme = defineMultiStyleConfig14({
  baseStyle: baseStyle22
});

// node_modules/@chakra-ui/theme/dist/chunk-JN6QBAR6.mjs
var { defineMultiStyleConfig: defineMultiStyleConfig15, definePartsStyle: definePartsStyle15 } = createMultiStyleConfigHelpers(modalAnatomy.keys);
var $bg10 = cssVar("modal-bg");
var $shadow3 = cssVar("modal-shadow");
var baseStyleOverlay = defineStyle({
  bg: "blackAlpha.600",
  zIndex: "modal"
});
var baseStyleDialogContainer = defineStyle((props) => {
  const { isCentered, scrollBehavior } = props;
  return {
    display: "flex",
    zIndex: "modal",
    justifyContent: "center",
    alignItems: isCentered ? "center" : "flex-start",
    overflow: scrollBehavior === "inside" ? "hidden" : "auto",
    overscrollBehaviorY: "none"
  };
});
var baseStyleDialog = defineStyle((props) => {
  const { isCentered, scrollBehavior } = props;
  return {
    borderRadius: "md",
    color: "inherit",
    my: isCentered ? "auto" : "16",
    mx: isCentered ? "auto" : void 0,
    zIndex: "modal",
    maxH: scrollBehavior === "inside" ? "calc(100% - 7.5rem)" : void 0,
    [$bg10.variable]: "colors.white",
    [$shadow3.variable]: "shadows.lg",
    _dark: {
      [$bg10.variable]: "colors.gray.700",
      [$shadow3.variable]: "shadows.dark-lg"
    },
    bg: $bg10.reference,
    boxShadow: $shadow3.reference
  };
});
var baseStyleHeader = defineStyle({
  px: "6",
  py: "4",
  fontSize: "xl",
  fontWeight: "semibold"
});
var baseStyleCloseButton2 = defineStyle({
  position: "absolute",
  top: "2",
  insetEnd: "3"
});
var baseStyleBody = defineStyle((props) => {
  const { scrollBehavior } = props;
  return {
    px: "6",
    py: "2",
    flex: "1",
    overflow: scrollBehavior === "inside" ? "auto" : void 0
  };
});
var baseStyleFooter = defineStyle({
  px: "6",
  py: "4"
});
var baseStyle23 = definePartsStyle15((props) => ({
  overlay: baseStyleOverlay,
  dialogContainer: runIfFn2(baseStyleDialogContainer, props),
  dialog: runIfFn2(baseStyleDialog, props),
  header: baseStyleHeader,
  closeButton: baseStyleCloseButton2,
  body: runIfFn2(baseStyleBody, props),
  footer: baseStyleFooter
}));
function getSize(value) {
  if (value === "full") {
    return definePartsStyle15({
      dialog: {
        maxW: "100vw",
        minH: "$100vh",
        my: "0",
        borderRadius: "0"
      }
    });
  }
  return definePartsStyle15({
    dialog: { maxW: value }
  });
}
var sizes15 = {
  xs: getSize("xs"),
  sm: getSize("sm"),
  md: getSize("md"),
  lg: getSize("lg"),
  xl: getSize("xl"),
  "2xl": getSize("2xl"),
  "3xl": getSize("3xl"),
  "4xl": getSize("4xl"),
  "5xl": getSize("5xl"),
  "6xl": getSize("6xl"),
  full: getSize("full")
};
var modalTheme = defineMultiStyleConfig15({
  baseStyle: baseStyle23,
  sizes: sizes15,
  defaultProps: { size: "md" }
});

// node_modules/@chakra-ui/theme/dist/chunk-57T4IAPW.mjs
var { defineMultiStyleConfig: defineMultiStyleConfig16, definePartsStyle: definePartsStyle16 } = createMultiStyleConfigHelpers(numberInputAnatomy.keys);
var $stepperWidth = cssVar2("number-input-stepper-width");
var $inputPadding = cssVar2("number-input-input-padding");
var inputPaddingValue = calc2($stepperWidth).add("0.5rem").toString();
var $bg11 = cssVar2("number-input-bg");
var $fg3 = cssVar2("number-input-color");
var $border2 = cssVar2("number-input-border-color");
var baseStyleRoot2 = defineStyle({
  [$stepperWidth.variable]: "sizes.6",
  [$inputPadding.variable]: inputPaddingValue
});
var baseStyleField2 = defineStyle(
  (props) => {
    var _a7, _b5;
    return (_b5 = (_a7 = runIfFn2(inputTheme.baseStyle, props)) == null ? void 0 : _a7.field) != null ? _b5 : {};
  }
);
var baseStyleStepperGroup = defineStyle({
  width: $stepperWidth.reference
});
var baseStyleStepper = defineStyle({
  borderStart: "1px solid",
  borderStartColor: $border2.reference,
  color: $fg3.reference,
  bg: $bg11.reference,
  [$fg3.variable]: "colors.chakra-body-text",
  [$border2.variable]: "colors.chakra-border-color",
  _dark: {
    [$fg3.variable]: "colors.whiteAlpha.800",
    [$border2.variable]: "colors.whiteAlpha.300"
  },
  _active: {
    [$bg11.variable]: "colors.gray.200",
    _dark: {
      [$bg11.variable]: "colors.whiteAlpha.300"
    }
  },
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed"
  }
});
var baseStyle24 = definePartsStyle16((props) => {
  var _a7;
  return {
    root: baseStyleRoot2,
    field: (_a7 = runIfFn2(baseStyleField2, props)) != null ? _a7 : {},
    stepperGroup: baseStyleStepperGroup,
    stepper: baseStyleStepper
  };
});
function getSize2(size2) {
  var _a7, _b5, _c3;
  const sizeStyle = (_a7 = inputTheme.sizes) == null ? void 0 : _a7[size2];
  const radius = {
    lg: "md",
    md: "md",
    sm: "sm",
    xs: "sm"
  };
  const _fontSize = (_c3 = (_b5 = sizeStyle.field) == null ? void 0 : _b5.fontSize) != null ? _c3 : "md";
  const fontSize = typography_default.fontSizes[_fontSize];
  return definePartsStyle16({
    field: {
      ...sizeStyle.field,
      paddingInlineEnd: $inputPadding.reference,
      verticalAlign: "top"
    },
    stepper: {
      fontSize: calc2(fontSize).multiply(0.75).toString(),
      _first: {
        borderTopEndRadius: radius[size2]
      },
      _last: {
        borderBottomEndRadius: radius[size2],
        mt: "-1px",
        borderTopWidth: 1
      }
    }
  });
}
var sizes16 = {
  xs: getSize2("xs"),
  sm: getSize2("sm"),
  md: getSize2("md"),
  lg: getSize2("lg")
};
var numberInputTheme = defineMultiStyleConfig16({
  baseStyle: baseStyle24,
  sizes: sizes16,
  variants: inputTheme.variants,
  defaultProps: inputTheme.defaultProps
});

// node_modules/@chakra-ui/theme/dist/chunk-OEFJDLVS.mjs
var _a5;
var baseStyle25 = defineStyle({
  ...(_a5 = inputTheme.baseStyle) == null ? void 0 : _a5.field,
  textAlign: "center"
});
var sizes17 = {
  lg: defineStyle({
    fontSize: "lg",
    w: 12,
    h: 12,
    borderRadius: "md"
  }),
  md: defineStyle({
    fontSize: "md",
    w: 10,
    h: 10,
    borderRadius: "md"
  }),
  sm: defineStyle({
    fontSize: "sm",
    w: 8,
    h: 8,
    borderRadius: "sm"
  }),
  xs: defineStyle({
    fontSize: "xs",
    w: 6,
    h: 6,
    borderRadius: "sm"
  })
};
var _a23;
var _b4;
var variants7 = {
  outline: defineStyle(
    (props) => {
      var _a32, _b22, _c3;
      return (_c3 = (_b22 = runIfFn2((_a32 = inputTheme.variants) == null ? void 0 : _a32.outline, props)) == null ? void 0 : _b22.field) != null ? _c3 : {};
    }
  ),
  flushed: defineStyle(
    (props) => {
      var _a32, _b22, _c3;
      return (_c3 = (_b22 = runIfFn2((_a32 = inputTheme.variants) == null ? void 0 : _a32.flushed, props)) == null ? void 0 : _b22.field) != null ? _c3 : {};
    }
  ),
  filled: defineStyle(
    (props) => {
      var _a32, _b22, _c3;
      return (_c3 = (_b22 = runIfFn2((_a32 = inputTheme.variants) == null ? void 0 : _a32.filled, props)) == null ? void 0 : _b22.field) != null ? _c3 : {};
    }
  ),
  unstyled: (_b4 = (_a23 = inputTheme.variants) == null ? void 0 : _a23.unstyled.field) != null ? _b4 : {}
};
var pinInputTheme = defineStyleConfig({
  baseStyle: baseStyle25,
  sizes: sizes17,
  variants: variants7,
  defaultProps: inputTheme.defaultProps
});

// node_modules/@chakra-ui/theme/dist/chunk-U3INMHUO.mjs
var { defineMultiStyleConfig: defineMultiStyleConfig17, definePartsStyle: definePartsStyle17 } = createMultiStyleConfigHelpers(popoverAnatomy.keys);
var $popperBg = cssVar2("popper-bg");
var $arrowBg2 = cssVar2("popper-arrow-bg");
var $arrowShadowColor = cssVar2("popper-arrow-shadow-color");
var baseStylePopper = defineStyle({ zIndex: 10 });
var baseStyleContent = defineStyle({
  [$popperBg.variable]: `colors.white`,
  bg: $popperBg.reference,
  [$arrowBg2.variable]: $popperBg.reference,
  [$arrowShadowColor.variable]: `colors.gray.200`,
  _dark: {
    [$popperBg.variable]: `colors.gray.700`,
    [$arrowShadowColor.variable]: `colors.whiteAlpha.300`
  },
  width: "xs",
  border: "1px solid",
  borderColor: "inherit",
  borderRadius: "md",
  boxShadow: "sm",
  zIndex: "inherit",
  _focusVisible: {
    outline: 0,
    boxShadow: "outline"
  }
});
var baseStyleHeader2 = defineStyle({
  px: 3,
  py: 2,
  borderBottomWidth: "1px"
});
var baseStyleBody2 = defineStyle({
  px: 3,
  py: 2
});
var baseStyleFooter2 = defineStyle({
  px: 3,
  py: 2,
  borderTopWidth: "1px"
});
var baseStyleCloseButton3 = defineStyle({
  position: "absolute",
  borderRadius: "md",
  top: 1,
  insetEnd: 2,
  padding: 2
});
var baseStyle26 = definePartsStyle17({
  popper: baseStylePopper,
  content: baseStyleContent,
  header: baseStyleHeader2,
  body: baseStyleBody2,
  footer: baseStyleFooter2,
  closeButton: baseStyleCloseButton3
});
var popoverTheme = defineMultiStyleConfig17({
  baseStyle: baseStyle26
});

// node_modules/@chakra-ui/theme/dist/chunk-VWP3ZVQT.mjs
var { definePartsStyle: definePartsStyle18, defineMultiStyleConfig: defineMultiStyleConfig18 } = createMultiStyleConfigHelpers(drawerAnatomy.keys);
var $bg12 = cssVar("drawer-bg");
var $bs = cssVar("drawer-box-shadow");
function getSize3(value) {
  if (value === "full") {
    return definePartsStyle18({
      dialog: { maxW: "100vw", h: "100vh" }
    });
  }
  return definePartsStyle18({
    dialog: { maxW: value }
  });
}
var baseStyleOverlay2 = defineStyle({
  bg: "blackAlpha.600",
  zIndex: "modal"
});
var baseStyleDialogContainer2 = defineStyle({
  display: "flex",
  zIndex: "modal",
  justifyContent: "center"
});
var baseStyleDialog2 = defineStyle((props) => {
  const { isFullHeight } = props;
  return {
    ...isFullHeight && { height: "100vh" },
    zIndex: "modal",
    maxH: "100vh",
    color: "inherit",
    [$bg12.variable]: "colors.white",
    [$bs.variable]: "shadows.lg",
    _dark: {
      [$bg12.variable]: "colors.gray.700",
      [$bs.variable]: "shadows.dark-lg"
    },
    bg: $bg12.reference,
    boxShadow: $bs.reference
  };
});
var baseStyleHeader3 = defineStyle({
  px: "6",
  py: "4",
  fontSize: "xl",
  fontWeight: "semibold"
});
var baseStyleCloseButton4 = defineStyle({
  position: "absolute",
  top: "2",
  insetEnd: "3"
});
var baseStyleBody3 = defineStyle({
  px: "6",
  py: "2",
  flex: "1",
  overflow: "auto"
});
var baseStyleFooter3 = defineStyle({
  px: "6",
  py: "4"
});
var baseStyle27 = definePartsStyle18((props) => ({
  overlay: baseStyleOverlay2,
  dialogContainer: baseStyleDialogContainer2,
  dialog: runIfFn2(baseStyleDialog2, props),
  header: baseStyleHeader3,
  closeButton: baseStyleCloseButton4,
  body: baseStyleBody3,
  footer: baseStyleFooter3
}));
var sizes18 = {
  xs: getSize3("xs"),
  sm: getSize3("md"),
  md: getSize3("lg"),
  lg: getSize3("2xl"),
  xl: getSize3("4xl"),
  full: getSize3("full")
};
var drawerTheme = defineMultiStyleConfig18({
  baseStyle: baseStyle27,
  sizes: sizes18,
  defaultProps: {
    size: "xs"
  }
});

// node_modules/@chakra-ui/theme/dist/chunk-D6DZ26HA.mjs
var { definePartsStyle: definePartsStyle19, defineMultiStyleConfig: defineMultiStyleConfig19 } = createMultiStyleConfigHelpers(editableAnatomy.keys);
var baseStylePreview = defineStyle({
  borderRadius: "md",
  py: "1",
  transitionProperty: "common",
  transitionDuration: "normal"
});
var baseStyleInput = defineStyle({
  borderRadius: "md",
  py: "1",
  transitionProperty: "common",
  transitionDuration: "normal",
  width: "full",
  _focusVisible: { boxShadow: "outline" },
  _placeholder: { opacity: 0.6 }
});
var baseStyleTextarea = defineStyle({
  borderRadius: "md",
  py: "1",
  transitionProperty: "common",
  transitionDuration: "normal",
  width: "full",
  _focusVisible: { boxShadow: "outline" },
  _placeholder: { opacity: 0.6 }
});
var baseStyle28 = definePartsStyle19({
  preview: baseStylePreview,
  input: baseStyleInput,
  textarea: baseStyleTextarea
});
var editableTheme = defineMultiStyleConfig19({
  baseStyle: baseStyle28
});

// node_modules/@chakra-ui/theme/dist/chunk-O6GGGS4Y.mjs
var { definePartsStyle: definePartsStyle20, defineMultiStyleConfig: defineMultiStyleConfig20 } = createMultiStyleConfigHelpers(formAnatomy.keys);
var $fg4 = cssVar("form-control-color");
var baseStyleRequiredIndicator = defineStyle({
  marginStart: "1",
  [$fg4.variable]: "colors.red.500",
  _dark: {
    [$fg4.variable]: "colors.red.300"
  },
  color: $fg4.reference
});
var baseStyleHelperText = defineStyle({
  mt: "2",
  [$fg4.variable]: "colors.gray.600",
  _dark: {
    [$fg4.variable]: "colors.whiteAlpha.600"
  },
  color: $fg4.reference,
  lineHeight: "normal",
  fontSize: "sm"
});
var baseStyle29 = definePartsStyle20({
  container: {
    width: "100%",
    position: "relative"
  },
  requiredIndicator: baseStyleRequiredIndicator,
  helperText: baseStyleHelperText
});
var formTheme = defineMultiStyleConfig20({
  baseStyle: baseStyle29
});

// node_modules/@chakra-ui/theme/dist/chunk-SRBDDT7F.mjs
var { definePartsStyle: definePartsStyle21, defineMultiStyleConfig: defineMultiStyleConfig21 } = createMultiStyleConfigHelpers(formErrorAnatomy.keys);
var $fg5 = cssVar("form-error-color");
var baseStyleText = defineStyle({
  [$fg5.variable]: `colors.red.500`,
  _dark: {
    [$fg5.variable]: `colors.red.300`
  },
  color: $fg5.reference,
  mt: "2",
  fontSize: "sm",
  lineHeight: "normal"
});
var baseStyleIcon6 = defineStyle({
  marginEnd: "0.5em",
  [$fg5.variable]: `colors.red.500`,
  _dark: {
    [$fg5.variable]: `colors.red.300`
  },
  color: $fg5.reference
});
var baseStyle30 = definePartsStyle21({
  text: baseStyleText,
  icon: baseStyleIcon6
});
var formErrorTheme = defineMultiStyleConfig21({
  baseStyle: baseStyle30
});

// node_modules/@chakra-ui/theme/dist/chunk-VHM7WLW6.mjs
var baseStyle31 = defineStyle({
  fontSize: "md",
  marginEnd: "3",
  mb: "2",
  fontWeight: "medium",
  transitionProperty: "common",
  transitionDuration: "normal",
  opacity: 1,
  _disabled: {
    opacity: 0.4
  }
});
var formLabelTheme = defineStyleConfig({
  baseStyle: baseStyle31
});

// node_modules/@chakra-ui/theme/dist/chunk-WXARPSDQ.mjs
var baseStyle32 = defineStyle({
  fontFamily: "heading",
  fontWeight: "bold"
});
var sizes19 = {
  "4xl": defineStyle({
    fontSize: ["6xl", null, "7xl"],
    lineHeight: 1
  }),
  "3xl": defineStyle({
    fontSize: ["5xl", null, "6xl"],
    lineHeight: 1
  }),
  "2xl": defineStyle({
    fontSize: ["4xl", null, "5xl"],
    lineHeight: [1.2, null, 1]
  }),
  xl: defineStyle({
    fontSize: ["3xl", null, "4xl"],
    lineHeight: [1.33, null, 1.2]
  }),
  lg: defineStyle({
    fontSize: ["2xl", null, "3xl"],
    lineHeight: [1.33, null, 1.2]
  }),
  md: defineStyle({
    fontSize: "xl",
    lineHeight: 1.2
  }),
  sm: defineStyle({
    fontSize: "md",
    lineHeight: 1.2
  }),
  xs: defineStyle({
    fontSize: "sm",
    lineHeight: 1.2
  })
};
var headingTheme = defineStyleConfig({
  baseStyle: baseStyle32,
  sizes: sizes19,
  defaultProps: {
    size: "xl"
  }
});

// node_modules/@chakra-ui/theme/dist/chunk-FU5DDBRC.mjs
var { defineMultiStyleConfig: defineMultiStyleConfig22, definePartsStyle: definePartsStyle22 } = createMultiStyleConfigHelpers(breadcrumbAnatomy.keys);
var $decor = cssVar("breadcrumb-link-decor");
var baseStyleLink = defineStyle({
  transitionProperty: "common",
  transitionDuration: "fast",
  transitionTimingFunction: "ease-out",
  outline: "none",
  color: "inherit",
  textDecoration: $decor.reference,
  [$decor.variable]: "none",
  "&:not([aria-current=page])": {
    cursor: "pointer",
    _hover: {
      [$decor.variable]: "underline"
    },
    _focusVisible: {
      boxShadow: "outline"
    }
  }
});
var baseStyle33 = definePartsStyle22({
  link: baseStyleLink
});
var breadcrumbTheme = defineMultiStyleConfig22({
  baseStyle: baseStyle33
});

// node_modules/@chakra-ui/theme/dist/chunk-MBVM6PEK.mjs
var baseStyle34 = defineStyle({
  lineHeight: "1.2",
  borderRadius: "md",
  fontWeight: "semibold",
  transitionProperty: "common",
  transitionDuration: "normal",
  _focusVisible: {
    boxShadow: "outline"
  },
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed",
    boxShadow: "none"
  },
  _hover: {
    _disabled: {
      bg: "initial"
    }
  }
});
var variantGhost = defineStyle((props) => {
  const { colorScheme: c, theme: theme2 } = props;
  if (c === "gray") {
    return {
      color: mode(`gray.800`, `whiteAlpha.900`)(props),
      _hover: {
        bg: mode(`gray.100`, `whiteAlpha.200`)(props)
      },
      _active: { bg: mode(`gray.200`, `whiteAlpha.300`)(props) }
    };
  }
  const darkHoverBg = transparentize2(`${c}.200`, 0.12)(theme2);
  const darkActiveBg = transparentize2(`${c}.200`, 0.24)(theme2);
  return {
    color: mode(`${c}.600`, `${c}.200`)(props),
    bg: "transparent",
    _hover: {
      bg: mode(`${c}.50`, darkHoverBg)(props)
    },
    _active: {
      bg: mode(`${c}.100`, darkActiveBg)(props)
    }
  };
});
var variantOutline3 = defineStyle((props) => {
  const { colorScheme: c } = props;
  const borderColor = mode(`gray.200`, `whiteAlpha.300`)(props);
  return {
    border: "1px solid",
    borderColor: c === "gray" ? borderColor : "currentColor",
    ".chakra-button__group[data-attached][data-orientation=horizontal] > &:not(:last-of-type)": { marginEnd: "-1px" },
    ".chakra-button__group[data-attached][data-orientation=vertical] > &:not(:last-of-type)": { marginBottom: "-1px" },
    ...runIfFn2(variantGhost, props)
  };
});
var accessibleColorMap = {
  yellow: {
    bg: "yellow.400",
    color: "black",
    hoverBg: "yellow.500",
    activeBg: "yellow.600"
  },
  cyan: {
    bg: "cyan.400",
    color: "black",
    hoverBg: "cyan.500",
    activeBg: "cyan.600"
  }
};
var variantSolid2 = defineStyle((props) => {
  var _a7;
  const { colorScheme: c } = props;
  if (c === "gray") {
    const bg2 = mode(`gray.100`, `whiteAlpha.200`)(props);
    return {
      bg: bg2,
      color: mode(`gray.800`, `whiteAlpha.900`)(props),
      _hover: {
        bg: mode(`gray.200`, `whiteAlpha.300`)(props),
        _disabled: {
          bg: bg2
        }
      },
      _active: { bg: mode(`gray.300`, `whiteAlpha.400`)(props) }
    };
  }
  const {
    bg = `${c}.500`,
    color: color3 = "white",
    hoverBg = `${c}.600`,
    activeBg = `${c}.700`
  } = (_a7 = accessibleColorMap[c]) != null ? _a7 : {};
  const background2 = mode(bg, `${c}.200`)(props);
  return {
    bg: background2,
    color: mode(color3, `gray.800`)(props),
    _hover: {
      bg: mode(hoverBg, `${c}.300`)(props),
      _disabled: {
        bg: background2
      }
    },
    _active: { bg: mode(activeBg, `${c}.400`)(props) }
  };
});
var variantLink = defineStyle((props) => {
  const { colorScheme: c } = props;
  return {
    padding: 0,
    height: "auto",
    lineHeight: "normal",
    verticalAlign: "baseline",
    color: mode(`${c}.500`, `${c}.200`)(props),
    _hover: {
      textDecoration: "underline",
      _disabled: {
        textDecoration: "none"
      }
    },
    _active: {
      color: mode(`${c}.700`, `${c}.500`)(props)
    }
  };
});
var variantUnstyled3 = defineStyle({
  bg: "none",
  color: "inherit",
  display: "inline",
  lineHeight: "inherit",
  m: "0",
  p: "0"
});
var variants8 = {
  ghost: variantGhost,
  outline: variantOutline3,
  solid: variantSolid2,
  link: variantLink,
  unstyled: variantUnstyled3
};
var sizes20 = {
  lg: defineStyle({
    h: "12",
    minW: "12",
    fontSize: "lg",
    px: "6"
  }),
  md: defineStyle({
    h: "10",
    minW: "10",
    fontSize: "md",
    px: "4"
  }),
  sm: defineStyle({
    h: "8",
    minW: "8",
    fontSize: "sm",
    px: "3"
  }),
  xs: defineStyle({
    h: "6",
    minW: "6",
    fontSize: "xs",
    px: "2"
  })
};
var buttonTheme = defineStyleConfig({
  baseStyle: baseStyle34,
  variants: variants8,
  sizes: sizes20,
  defaultProps: {
    variant: "solid",
    size: "md",
    colorScheme: "gray"
  }
});

// node_modules/@chakra-ui/theme/dist/chunk-F7CKIHPM.mjs
var { definePartsStyle: definePartsStyle23, defineMultiStyleConfig: defineMultiStyleConfig23 } = createMultiStyleConfigHelpers(cardAnatomy.keys);
var $bg13 = cssVar("card-bg");
var $padding2 = cssVar("card-padding");
var $shadow4 = cssVar("card-shadow");
var $radius = cssVar("card-radius");
var $border3 = cssVar("card-border-width", "0");
var $borderColor = cssVar("card-border-color");
var baseStyle35 = definePartsStyle23({
  container: {
    [$bg13.variable]: "colors.chakra-body-bg",
    backgroundColor: $bg13.reference,
    boxShadow: $shadow4.reference,
    borderRadius: $radius.reference,
    color: "chakra-body-text",
    borderWidth: $border3.reference,
    borderColor: $borderColor.reference
  },
  body: {
    padding: $padding2.reference,
    flex: "1 1 0%"
  },
  header: {
    padding: $padding2.reference
  },
  footer: {
    padding: $padding2.reference
  }
});
var sizes21 = {
  sm: definePartsStyle23({
    container: {
      [$radius.variable]: "radii.base",
      [$padding2.variable]: "space.3"
    }
  }),
  md: definePartsStyle23({
    container: {
      [$radius.variable]: "radii.md",
      [$padding2.variable]: "space.5"
    }
  }),
  lg: definePartsStyle23({
    container: {
      [$radius.variable]: "radii.xl",
      [$padding2.variable]: "space.7"
    }
  })
};
var variants9 = {
  elevated: definePartsStyle23({
    container: {
      [$shadow4.variable]: "shadows.base",
      _dark: {
        [$bg13.variable]: "colors.gray.700"
      }
    }
  }),
  outline: definePartsStyle23({
    container: {
      [$border3.variable]: "1px",
      [$borderColor.variable]: "colors.chakra-border-color"
    }
  }),
  filled: definePartsStyle23({
    container: {
      [$bg13.variable]: "colors.chakra-subtle-bg"
    }
  }),
  unstyled: {
    body: {
      [$padding2.variable]: 0
    },
    header: {
      [$padding2.variable]: 0
    },
    footer: {
      [$padding2.variable]: 0
    }
  }
};
var cardTheme = defineMultiStyleConfig23({
  baseStyle: baseStyle35,
  variants: variants9,
  sizes: sizes21,
  defaultProps: {
    variant: "elevated",
    size: "md"
  }
});

// node_modules/@chakra-ui/theme/dist/chunk-OB7MMEC3.mjs
var $size4 = cssVar2("close-button-size");
var $bg14 = cssVar2("close-button-bg");
var baseStyle36 = defineStyle({
  w: [$size4.reference],
  h: [$size4.reference],
  borderRadius: "md",
  transitionProperty: "common",
  transitionDuration: "normal",
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed",
    boxShadow: "none"
  },
  _hover: {
    [$bg14.variable]: "colors.blackAlpha.100",
    _dark: {
      [$bg14.variable]: "colors.whiteAlpha.100"
    }
  },
  _active: {
    [$bg14.variable]: "colors.blackAlpha.200",
    _dark: {
      [$bg14.variable]: "colors.whiteAlpha.200"
    }
  },
  _focusVisible: {
    boxShadow: "outline"
  },
  bg: $bg14.reference
});
var sizes22 = {
  lg: defineStyle({
    [$size4.variable]: "sizes.10",
    fontSize: "md"
  }),
  md: defineStyle({
    [$size4.variable]: "sizes.8",
    fontSize: "xs"
  }),
  sm: defineStyle({
    [$size4.variable]: "sizes.6",
    fontSize: "2xs"
  })
};
var closeButtonTheme = defineStyleConfig({
  baseStyle: baseStyle36,
  sizes: sizes22,
  defaultProps: {
    size: "md"
  }
});

// node_modules/@chakra-ui/theme/dist/chunk-K3RH7Y2L.mjs
var { variants: variants10, defaultProps } = badgeTheme;
var baseStyle37 = defineStyle({
  fontFamily: "mono",
  fontSize: "sm",
  px: "0.2em",
  borderRadius: "sm",
  bg: vars.bg.reference,
  color: vars.color.reference,
  boxShadow: vars.shadow.reference
});
var codeTheme = defineStyleConfig({
  baseStyle: baseStyle37,
  variants: variants10,
  defaultProps
});

// node_modules/@chakra-ui/theme/dist/chunk-TECE6HDR.mjs
var baseStyle38 = defineStyle({
  w: "100%",
  mx: "auto",
  maxW: "prose",
  px: "4"
});
var containerTheme = defineStyleConfig({
  baseStyle: baseStyle38
});

// node_modules/@chakra-ui/theme/dist/chunk-5S44M2O4.mjs
var baseStyle39 = defineStyle({
  opacity: 0.6,
  borderColor: "inherit"
});
var variantSolid3 = defineStyle({
  borderStyle: "solid"
});
var variantDashed = defineStyle({
  borderStyle: "dashed"
});
var variants11 = {
  solid: variantSolid3,
  dashed: variantDashed
};
var dividerTheme = defineStyleConfig({
  baseStyle: baseStyle39,
  variants: variants11,
  defaultProps: {
    variant: "solid"
  }
});

// node_modules/@chakra-ui/theme/dist/chunk-J7AGDWFO.mjs
var { definePartsStyle: definePartsStyle24, defineMultiStyleConfig: defineMultiStyleConfig24 } = createMultiStyleConfigHelpers(accordionAnatomy.keys);
var baseStyleContainer4 = defineStyle({
  borderTopWidth: "1px",
  borderColor: "inherit",
  _last: {
    borderBottomWidth: "1px"
  }
});
var baseStyleButton2 = defineStyle({
  transitionProperty: "common",
  transitionDuration: "normal",
  fontSize: "md",
  _focusVisible: {
    boxShadow: "outline"
  },
  _hover: {
    bg: "blackAlpha.50"
  },
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed"
  },
  px: "4",
  py: "2"
});
var baseStylePanel = defineStyle({
  pt: "2",
  px: "4",
  pb: "5"
});
var baseStyleIcon7 = defineStyle({
  fontSize: "1.25em"
});
var baseStyle40 = definePartsStyle24({
  container: baseStyleContainer4,
  button: baseStyleButton2,
  panel: baseStylePanel,
  icon: baseStyleIcon7
});
var accordionTheme = defineMultiStyleConfig24({ baseStyle: baseStyle40 });

// node_modules/@chakra-ui/theme/dist/chunk-BNQWYFTH.mjs
var { definePartsStyle: definePartsStyle25, defineMultiStyleConfig: defineMultiStyleConfig25 } = createMultiStyleConfigHelpers(alertAnatomy.keys);
var $fg6 = cssVar("alert-fg");
var $bg15 = cssVar("alert-bg");
var baseStyle41 = definePartsStyle25({
  container: {
    bg: $bg15.reference,
    px: "4",
    py: "3"
  },
  title: {
    fontWeight: "bold",
    lineHeight: "6",
    marginEnd: "2"
  },
  description: {
    lineHeight: "6"
  },
  icon: {
    color: $fg6.reference,
    flexShrink: 0,
    marginEnd: "3",
    w: "5",
    h: "6"
  },
  spinner: {
    color: $fg6.reference,
    flexShrink: 0,
    marginEnd: "3",
    w: "5",
    h: "5"
  }
});
function getBg(props) {
  const { theme: theme2, colorScheme: c } = props;
  const darkBg = transparentize2(`${c}.200`, 0.16)(theme2);
  return {
    light: `colors.${c}.100`,
    dark: darkBg
  };
}
var variantSubtle2 = definePartsStyle25((props) => {
  const { colorScheme: c } = props;
  const bg = getBg(props);
  return {
    container: {
      [$fg6.variable]: `colors.${c}.600`,
      [$bg15.variable]: bg.light,
      _dark: {
        [$fg6.variable]: `colors.${c}.200`,
        [$bg15.variable]: bg.dark
      }
    }
  };
});
var variantLeftAccent = definePartsStyle25((props) => {
  const { colorScheme: c } = props;
  const bg = getBg(props);
  return {
    container: {
      [$fg6.variable]: `colors.${c}.600`,
      [$bg15.variable]: bg.light,
      _dark: {
        [$fg6.variable]: `colors.${c}.200`,
        [$bg15.variable]: bg.dark
      },
      paddingStart: "3",
      borderStartWidth: "4px",
      borderStartColor: $fg6.reference
    }
  };
});
var variantTopAccent = definePartsStyle25((props) => {
  const { colorScheme: c } = props;
  const bg = getBg(props);
  return {
    container: {
      [$fg6.variable]: `colors.${c}.600`,
      [$bg15.variable]: bg.light,
      _dark: {
        [$fg6.variable]: `colors.${c}.200`,
        [$bg15.variable]: bg.dark
      },
      pt: "2",
      borderTopWidth: "4px",
      borderTopColor: $fg6.reference
    }
  };
});
var variantSolid4 = definePartsStyle25((props) => {
  const { colorScheme: c } = props;
  return {
    container: {
      [$fg6.variable]: `colors.white`,
      [$bg15.variable]: `colors.${c}.600`,
      _dark: {
        [$fg6.variable]: `colors.gray.900`,
        [$bg15.variable]: `colors.${c}.200`
      },
      color: $fg6.reference
    }
  };
});
var variants12 = {
  subtle: variantSubtle2,
  "left-accent": variantLeftAccent,
  "top-accent": variantTopAccent,
  solid: variantSolid4
};
var alertTheme = defineMultiStyleConfig25({
  baseStyle: baseStyle41,
  variants: variants12,
  defaultProps: {
    variant: "subtle",
    colorScheme: "blue"
  }
});

// node_modules/@chakra-ui/theme/dist/chunk-Q5ZQE4MD.mjs
var { definePartsStyle: definePartsStyle26, defineMultiStyleConfig: defineMultiStyleConfig26 } = createMultiStyleConfigHelpers(avatarAnatomy.keys);
var $border4 = cssVar("avatar-border-color");
var $bg16 = cssVar("avatar-bg");
var $fs = cssVar("avatar-font-size");
var $size5 = cssVar("avatar-size");
var baseStyleBadge = defineStyle({
  borderRadius: "full",
  border: "0.2em solid",
  borderColor: $border4.reference,
  [$border4.variable]: "white",
  _dark: {
    [$border4.variable]: "colors.gray.800"
  }
});
var baseStyleExcessLabel = defineStyle({
  bg: $bg16.reference,
  fontSize: $fs.reference,
  width: $size5.reference,
  height: $size5.reference,
  lineHeight: "1",
  [$bg16.variable]: "colors.gray.200",
  _dark: {
    [$bg16.variable]: "colors.whiteAlpha.400"
  }
});
var baseStyleContainer5 = defineStyle((props) => {
  const { name, theme: theme2 } = props;
  const bg = name ? randomColor({ string: name }) : "colors.gray.400";
  const isBgDark = isDark(bg)(theme2);
  let color3 = "white";
  if (!isBgDark)
    color3 = "gray.800";
  return {
    bg: $bg16.reference,
    fontSize: $fs.reference,
    color: color3,
    borderColor: $border4.reference,
    verticalAlign: "top",
    width: $size5.reference,
    height: $size5.reference,
    "&:not([data-loaded])": {
      [$bg16.variable]: bg
    },
    [$border4.variable]: "colors.white",
    _dark: {
      [$border4.variable]: "colors.gray.800"
    }
  };
});
var baseStyleLabel5 = defineStyle({
  fontSize: $fs.reference,
  lineHeight: "1"
});
var baseStyle42 = definePartsStyle26((props) => ({
  badge: runIfFn2(baseStyleBadge, props),
  excessLabel: runIfFn2(baseStyleExcessLabel, props),
  container: runIfFn2(baseStyleContainer5, props),
  label: baseStyleLabel5
}));
function getSize4(size2) {
  const themeSize = size2 !== "100%" ? sizes_default[size2] : void 0;
  return definePartsStyle26({
    container: {
      [$size5.variable]: themeSize != null ? themeSize : size2,
      [$fs.variable]: `calc(${themeSize != null ? themeSize : size2} / 2.5)`
    },
    excessLabel: {
      [$size5.variable]: themeSize != null ? themeSize : size2,
      [$fs.variable]: `calc(${themeSize != null ? themeSize : size2} / 2.5)`
    }
  });
}
var sizes23 = {
  "2xs": getSize4(4),
  xs: getSize4(6),
  sm: getSize4(8),
  md: getSize4(12),
  lg: getSize4(16),
  xl: getSize4(24),
  "2xl": getSize4(32),
  full: getSize4("100%")
};
var avatarTheme = defineMultiStyleConfig26({
  baseStyle: baseStyle42,
  sizes: sizes23,
  defaultProps: {
    size: "md"
  }
});

// node_modules/@chakra-ui/theme/dist/chunk-P7SDT22G.mjs
var components = {
  Accordion: accordionTheme,
  Alert: alertTheme,
  Avatar: avatarTheme,
  Badge: badgeTheme,
  Breadcrumb: breadcrumbTheme,
  Button: buttonTheme,
  Checkbox: checkboxTheme,
  CloseButton: closeButtonTheme,
  Code: codeTheme,
  Container: containerTheme,
  Divider: dividerTheme,
  Drawer: drawerTheme,
  Editable: editableTheme,
  Form: formTheme,
  FormError: formErrorTheme,
  FormLabel: formLabelTheme,
  Heading: headingTheme,
  Input: inputTheme,
  Kbd: kbdTheme,
  Link: linkTheme,
  List: listTheme,
  Menu: menuTheme,
  Modal: modalTheme,
  NumberInput: numberInputTheme,
  PinInput: pinInputTheme,
  Popover: popoverTheme,
  Progress: progressTheme,
  Radio: radioTheme,
  Select: selectTheme,
  Skeleton: skeletonTheme,
  SkipLink: skipLinkTheme,
  Slider: sliderTheme,
  Spinner: spinnerTheme,
  Stat: statTheme,
  Switch: switchTheme,
  Table: tableTheme,
  Tabs: tabsTheme,
  Tag: tagTheme,
  Textarea: textareaTheme,
  Tooltip: tooltipTheme,
  Card: cardTheme,
  Stepper: stepperTheme
};

// node_modules/@chakra-ui/theme/dist/chunk-5GOSZLB7.mjs
var semanticTokens = {
  colors: {
    "chakra-body-text": { _light: "gray.800", _dark: "whiteAlpha.900" },
    "chakra-body-bg": { _light: "white", _dark: "gray.800" },
    "chakra-border-color": { _light: "gray.200", _dark: "whiteAlpha.300" },
    "chakra-inverse-text": { _light: "white", _dark: "gray.800" },
    "chakra-subtle-bg": { _light: "gray.100", _dark: "gray.700" },
    "chakra-subtle-text": { _light: "gray.600", _dark: "gray.400" },
    "chakra-placeholder-color": { _light: "gray.500", _dark: "whiteAlpha.400" }
  }
};

// node_modules/@chakra-ui/theme/dist/chunk-3F7U33P5.mjs
var styles = {
  global: {
    body: {
      fontFamily: "body",
      color: "chakra-body-text",
      bg: "chakra-body-bg",
      transitionProperty: "background-color",
      transitionDuration: "normal",
      lineHeight: "base"
    },
    "*::placeholder": {
      color: "chakra-placeholder-color"
    },
    "*, *::before, &::after": {
      borderColor: "chakra-border-color"
    }
  }
};

// node_modules/@chakra-ui/theme/dist/index.mjs
var direction = "ltr";
var config = {
  useSystemColorMode: false,
  initialColorMode: "light",
  cssVarPrefix: "chakra"
};
var theme = {
  semanticTokens,
  direction,
  ...foundations,
  components,
  styles,
  config
};
var baseTheme = {
  semanticTokens,
  direction,
  components: {},
  ...foundations,
  styles,
  config
};

// node_modules/@chakra-ui/utils/dist/chunk-YTQ3XZ3T.mjs
var import_lodash5 = __toESM(require_lodash(), 1);
function omit2(object, keys2) {
  const result = {};
  Object.keys(object).forEach((key) => {
    if (keys2.includes(key))
      return;
    result[key] = object[key];
  });
  return result;
}
function get2(obj, path, fallback, index2) {
  const key = typeof path === "string" ? path.split(".") : [path];
  for (index2 = 0; index2 < key.length; index2 += 1) {
    if (!obj)
      break;
    obj = obj[key[index2]];
  }
  return obj === void 0 ? fallback : obj;
}
var memoize3 = (fn2) => {
  const cache = /* @__PURE__ */ new WeakMap();
  const memoizedFn = (obj, path, fallback, index2) => {
    if (typeof obj === "undefined") {
      return fn2(obj, path, fallback);
    }
    if (!cache.has(obj)) {
      cache.set(obj, /* @__PURE__ */ new Map());
    }
    const map = cache.get(obj);
    if (map.has(path)) {
      return map.get(path);
    }
    const value = fn2(obj, path, fallback, index2);
    map.set(path, value);
    return value;
  };
  return memoizedFn;
};
var memoizedGet2 = memoize3(get2);
function objectFilter(object, fn2) {
  const result = {};
  Object.keys(object).forEach((key) => {
    const value = object[key];
    const shouldPass = fn2(value, key, object);
    if (shouldPass) {
      result[key] = value;
    }
  });
  return result;
}
var filterUndefined = (object) => objectFilter(object, (val) => val !== null && val !== void 0);

// node_modules/@chakra-ui/utils/dist/chunk-Y5FGD7DM.mjs
function isFunction3(value) {
  return typeof value === "function";
}

// node_modules/@chakra-ui/utils/dist/chunk-M3TFMUOL.mjs
function runIfFn3(valueOrFn, ...args) {
  return isFunction3(valueOrFn) ? valueOrFn(...args) : valueOrFn;
}

// node_modules/@chakra-ui/system/dist/chunk-DMO4EI7P.mjs
var import_react9 = __toESM(require_react(), 1);
var import_react_fast_compare = __toESM(require_react_fast_compare(), 1);
"use client";
function useStyleConfigImpl(themeKey, props = {}) {
  var _a7;
  const { styleConfig: styleConfigProp, ...rest } = props;
  const { theme: theme2, colorMode } = useChakra();
  const themeStyleConfig = themeKey ? memoizedGet2(theme2, `components.${themeKey}`) : void 0;
  const styleConfig = styleConfigProp || themeStyleConfig;
  const mergedProps = (0, import_lodash5.default)(
    { theme: theme2, colorMode },
    (_a7 = styleConfig == null ? void 0 : styleConfig.defaultProps) != null ? _a7 : {},
    filterUndefined(omit2(rest, ["children"]))
  );
  const stylesRef = (0, import_react9.useRef)({});
  if (styleConfig) {
    const getStyles = resolveStyleConfig(styleConfig);
    const styles2 = getStyles(mergedProps);
    const isStyleEqual = (0, import_react_fast_compare.default)(stylesRef.current, styles2);
    if (!isStyleEqual) {
      stylesRef.current = styles2;
    }
  }
  return stylesRef.current;
}
function useStyleConfig(themeKey, props = {}) {
  return useStyleConfigImpl(themeKey, props);
}
function useMultiStyleConfig(themeKey, props = {}) {
  return useStyleConfigImpl(themeKey, props);
}

// node_modules/@chakra-ui/system/dist/chunk-FDQH4LQI.mjs
"use client";
var allPropNames = /* @__PURE__ */ new Set([
  ...propNames,
  "textStyle",
  "layerStyle",
  "apply",
  "noOfLines",
  "focusBorderColor",
  "errorBorderColor",
  "as",
  "__css",
  "css",
  "sx"
]);
var validHTMLProps = /* @__PURE__ */ new Set([
  "htmlWidth",
  "htmlHeight",
  "htmlSize",
  "htmlTranslate"
]);
function shouldForwardProp(prop) {
  return validHTMLProps.has(prop) || !allPropNames.has(prop);
}

// node_modules/@chakra-ui/object-utils/dist/chunk-OLTBUDV5.mjs
function assignAfter(target, ...sources) {
  if (target == null) {
    throw new TypeError("Cannot convert undefined or null to object");
  }
  const result = { ...target };
  for (const nextSource of sources) {
    if (nextSource == null)
      continue;
    for (const nextKey in nextSource) {
      if (!Object.prototype.hasOwnProperty.call(nextSource, nextKey))
        continue;
      if (nextKey in result)
        delete result[nextKey];
      result[nextKey] = nextSource[nextKey];
    }
  }
  return result;
}

// node_modules/@emotion/styled/base/dist/emotion-styled-base.browser.esm.js
var React = __toESM(require_react());

// node_modules/@emotion/styled/node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.esm.js
var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/;
var isPropValid = /* @__PURE__ */ memoize(
  function(prop) {
    return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111 && prop.charCodeAt(1) === 110 && prop.charCodeAt(2) < 91;
  }
  /* Z+1 */
);

// node_modules/@emotion/styled/base/dist/emotion-styled-base.browser.esm.js
var testOmitPropsOnStringTag = isPropValid;
var testOmitPropsOnComponent = function testOmitPropsOnComponent2(key) {
  return key !== "theme";
};
var getDefaultShouldForwardProp = function getDefaultShouldForwardProp2(tag) {
  return typeof tag === "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  tag.charCodeAt(0) > 96 ? testOmitPropsOnStringTag : testOmitPropsOnComponent;
};
var composeShouldForwardProps = function composeShouldForwardProps2(tag, options, isReal) {
  var shouldForwardProp2;
  if (options) {
    var optionsShouldForwardProp = options.shouldForwardProp;
    shouldForwardProp2 = tag.__emotion_forwardProp && optionsShouldForwardProp ? function(propName) {
      return tag.__emotion_forwardProp(propName) && optionsShouldForwardProp(propName);
    } : optionsShouldForwardProp;
  }
  if (typeof shouldForwardProp2 !== "function" && isReal) {
    shouldForwardProp2 = tag.__emotion_forwardProp;
  }
  return shouldForwardProp2;
};
var ILLEGAL_ESCAPE_SEQUENCE_ERROR = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`;
var Insertion = function Insertion2(_ref) {
  var cache = _ref.cache, serialized = _ref.serialized, isStringTag = _ref.isStringTag;
  registerStyles(cache, serialized, isStringTag);
  useInsertionEffectAlwaysWithSyncFallback(function() {
    return insertStyles(cache, serialized, isStringTag);
  });
  return null;
};
var createStyled = function createStyled2(tag, options) {
  if (true) {
    if (tag === void 0) {
      throw new Error("You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.");
    }
  }
  var isReal = tag.__emotion_real === tag;
  var baseTag = isReal && tag.__emotion_base || tag;
  var identifierName;
  var targetClassName;
  if (options !== void 0) {
    identifierName = options.label;
    targetClassName = options.target;
  }
  var shouldForwardProp2 = composeShouldForwardProps(tag, options, isReal);
  var defaultShouldForwardProp = shouldForwardProp2 || getDefaultShouldForwardProp(baseTag);
  var shouldUseAs = !defaultShouldForwardProp("as");
  return function() {
    var args = arguments;
    var styles2 = isReal && tag.__emotion_styles !== void 0 ? tag.__emotion_styles.slice(0) : [];
    if (identifierName !== void 0) {
      styles2.push("label:" + identifierName + ";");
    }
    if (args[0] == null || args[0].raw === void 0) {
      styles2.push.apply(styles2, args);
    } else {
      if (args[0][0] === void 0) {
        console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
      }
      styles2.push(args[0][0]);
      var len = args.length;
      var i = 1;
      for (; i < len; i++) {
        if (args[0][i] === void 0) {
          console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
        }
        styles2.push(args[i], args[0][i]);
      }
    }
    var Styled = withEmotionCache(function(props, cache, ref) {
      var FinalTag = shouldUseAs && props.as || baseTag;
      var className = "";
      var classInterpolations = [];
      var mergedProps = props;
      if (props.theme == null) {
        mergedProps = {};
        for (var key in props) {
          mergedProps[key] = props[key];
        }
        mergedProps.theme = React.useContext(ThemeContext);
      }
      if (typeof props.className === "string") {
        className = getRegisteredStyles(cache.registered, classInterpolations, props.className);
      } else if (props.className != null) {
        className = props.className + " ";
      }
      var serialized = serializeStyles(styles2.concat(classInterpolations), cache.registered, mergedProps);
      className += cache.key + "-" + serialized.name;
      if (targetClassName !== void 0) {
        className += " " + targetClassName;
      }
      var finalShouldForwardProp = shouldUseAs && shouldForwardProp2 === void 0 ? getDefaultShouldForwardProp(FinalTag) : defaultShouldForwardProp;
      var newProps = {};
      for (var _key in props) {
        if (shouldUseAs && _key === "as")
          continue;
        if (
          // $FlowFixMe
          finalShouldForwardProp(_key)
        ) {
          newProps[_key] = props[_key];
        }
      }
      newProps.className = className;
      newProps.ref = ref;
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Insertion, {
        cache,
        serialized,
        isStringTag: typeof FinalTag === "string"
      }), /* @__PURE__ */ React.createElement(FinalTag, newProps));
    });
    Styled.displayName = identifierName !== void 0 ? identifierName : "Styled(" + (typeof baseTag === "string" ? baseTag : baseTag.displayName || baseTag.name || "Component") + ")";
    Styled.defaultProps = tag.defaultProps;
    Styled.__emotion_real = Styled;
    Styled.__emotion_base = baseTag;
    Styled.__emotion_styles = styles2;
    Styled.__emotion_forwardProp = shouldForwardProp2;
    Object.defineProperty(Styled, "toString", {
      value: function value() {
        if (targetClassName === void 0 && true) {
          return "NO_COMPONENT_SELECTOR";
        }
        return "." + targetClassName;
      }
    });
    Styled.withComponent = function(nextTag, nextOptions) {
      return createStyled2(nextTag, _extends({}, options, nextOptions, {
        shouldForwardProp: composeShouldForwardProps(Styled, nextOptions, true)
      })).apply(void 0, styles2);
    };
    return Styled;
  };
};

// node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js
var import_react11 = __toESM(require_react());
var tags = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "big",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "marquee",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
  // SVG
  "circle",
  "clipPath",
  "defs",
  "ellipse",
  "foreignObject",
  "g",
  "image",
  "line",
  "linearGradient",
  "mask",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "stop",
  "svg",
  "text",
  "tspan"
];
var newStyled = createStyled.bind();
tags.forEach(function(tagName) {
  newStyled[tagName] = newStyled(tagName);
});

// node_modules/@chakra-ui/system/dist/chunk-5PL47M24.mjs
var import_react12 = __toESM(require_react(), 1);
"use client";
var _a6;
var emotion_styled = (_a6 = newStyled.default) != null ? _a6 : newStyled;
var toCSSObject = ({ baseStyle: baseStyle43 }) => (props) => {
  const { theme: theme2, css: cssProp, __css, sx, ...rest } = props;
  const styleProps2 = objectFilter(rest, (_, prop) => isStyleProp(prop));
  const finalBaseStyle = runIfFn3(baseStyle43, props);
  const finalStyles = assignAfter(
    {},
    __css,
    finalBaseStyle,
    filterUndefined(styleProps2),
    sx
  );
  const computedCSS = css2(finalStyles)(props.theme);
  return cssProp ? [computedCSS, cssProp] : computedCSS;
};
function styled(component, options) {
  const { baseStyle: baseStyle43, ...styledOptions } = options != null ? options : {};
  if (!styledOptions.shouldForwardProp) {
    styledOptions.shouldForwardProp = shouldForwardProp;
  }
  const styleObject = toCSSObject({ baseStyle: baseStyle43 });
  const Component2 = emotion_styled(
    component,
    styledOptions
  )(styleObject);
  const chakraComponent = import_react12.default.forwardRef(function ChakraComponent(props, ref) {
    const { colorMode, forced } = useColorMode();
    return import_react12.default.createElement(Component2, {
      ref,
      "data-theme": forced ? colorMode : void 0,
      ...props
    });
  });
  return chakraComponent;
}

// node_modules/@chakra-ui/system/dist/chunk-ZHQNHOQS.mjs
"use client";
function factory() {
  const cache = /* @__PURE__ */ new Map();
  return new Proxy(styled, {
    /**
     * @example
     * const Div = chakra("div")
     * const WithChakra = chakra(AnotherComponent)
     */
    apply(target, thisArg, argArray) {
      return styled(...argArray);
    },
    /**
     * @example
     * <chakra.div />
     */
    get(_, element) {
      if (!cache.has(element)) {
        cache.set(element, styled(element));
      }
      return cache.get(element);
    }
  });
}
var chakra = factory();

// node_modules/@chakra-ui/system/dist/chunk-ZJJGQIVY.mjs
var import_react13 = __toESM(require_react(), 1);
"use client";
function forwardRef(component) {
  return (0, import_react13.forwardRef)(component);
}

// node_modules/@chakra-ui/react-utils/dist/chunk-ITIKTQWJ.mjs
var import_react14 = __toESM(require_react(), 1);
function createContext3(options = {}) {
  const {
    strict = true,
    errorMessage = "useContext: `context` is undefined. Seems you forgot to wrap component within the Provider",
    name
  } = options;
  const Context = (0, import_react14.createContext)(void 0);
  Context.displayName = name;
  function useContext12() {
    var _a7;
    const context = (0, import_react14.useContext)(Context);
    if (!context && strict) {
      const error2 = new Error(errorMessage);
      error2.name = "ContextError";
      (_a7 = Error.captureStackTrace) == null ? void 0 : _a7.call(Error, error2, useContext12);
      throw error2;
    }
    return context;
  }
  return [
    Context.Provider,
    useContext12,
    Context
  ];
}

// node_modules/@chakra-ui/system/dist/chunk-MFVQSVQB.mjs
var import_react16 = __toESM(require_react(), 1);
var import_jsx_runtime5 = __toESM(require_jsx_runtime(), 1);
"use client";
function ThemeProvider2(props) {
  const { cssVarsRoot, theme: theme2, children } = props;
  const computedTheme = (0, import_react16.useMemo)(() => toCSSVar(theme2), [theme2]);
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(ThemeProvider, { theme: computedTheme, children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(CSSVars, { root: cssVarsRoot }),
    children
  ] });
}
function CSSVars({ root = ":host, :root" }) {
  const selector = [root, `[data-theme]`].join(",");
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Global, { styles: (theme2) => ({ [selector]: theme2.__cssVars }) });
}
var [StylesProvider, useStyles] = createContext3({
  name: "StylesContext",
  errorMessage: "useStyles: `styles` is undefined. Seems you forgot to wrap the components in `<StylesProvider />` "
});
function GlobalStyle() {
  const { colorMode } = useColorMode();
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    Global,
    {
      styles: (theme2) => {
        const styleObjectOrFn = memoizedGet2(theme2, "styles.global");
        const globalStyles = runIfFn3(styleObjectOrFn, { theme: theme2, colorMode });
        if (!globalStyles)
          return void 0;
        const styles2 = css2(globalStyles)(theme2);
        return styles2;
      }
    }
  );
}

// node_modules/@chakra-ui/react-env/dist/chunk-VMD3UMGK.mjs
var import_react18 = __toESM(require_react(), 1);
var import_jsx_runtime6 = __toESM(require_jsx_runtime(), 1);
"use client";
var EnvironmentContext = (0, import_react18.createContext)({
  getDocument() {
    return document;
  },
  getWindow() {
    return window;
  }
});
EnvironmentContext.displayName = "EnvironmentContext";
function EnvironmentProvider(props) {
  const { children, environment: environmentProp, disabled } = props;
  const ref = (0, import_react18.useRef)(null);
  const context = (0, import_react18.useMemo)(() => {
    if (environmentProp)
      return environmentProp;
    return {
      getDocument: () => {
        var _a7, _b5;
        return (_b5 = (_a7 = ref.current) == null ? void 0 : _a7.ownerDocument) != null ? _b5 : document;
      },
      getWindow: () => {
        var _a7, _b5;
        return (_b5 = (_a7 = ref.current) == null ? void 0 : _a7.ownerDocument.defaultView) != null ? _b5 : window;
      }
    };
  }, [environmentProp]);
  const showSpan = !disabled || !environmentProp;
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(EnvironmentContext.Provider, { value: context, children: [
    children,
    showSpan && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { id: "__chakra_env", hidden: true, ref })
  ] });
}
EnvironmentProvider.displayName = "EnvironmentProvider";

// node_modules/@chakra-ui/react-env/dist/index.mjs
"use client";

// node_modules/@chakra-ui/provider/dist/chunk-3DDHO3UN.mjs
var import_jsx_runtime7 = __toESM(require_jsx_runtime(), 1);
"use client";
var ChakraProvider = (props) => {
  const {
    children,
    colorModeManager,
    portalZIndex,
    resetScope,
    resetCSS = true,
    theme: theme2 = {},
    environment,
    cssVarsRoot,
    disableEnvironment,
    disableGlobalStyle
  } = props;
  const _children = /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
    EnvironmentProvider,
    {
      environment,
      disabled: disableEnvironment,
      children
    }
  );
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(ThemeProvider2, { theme: theme2, cssVarsRoot, children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
    ColorModeProvider,
    {
      colorModeManager,
      options: theme2.config,
      children: [
        resetCSS ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(CSSReset, { scope: resetScope }) : /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(CSSPolyfill, {}),
        !disableGlobalStyle && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(GlobalStyle, {}),
        portalZIndex ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(PortalManager, { zIndex: portalZIndex, children: _children }) : _children
      ]
    }
  ) });
};

// node_modules/@chakra-ui/provider/dist/index.mjs
"use client";

// node_modules/@chakra-ui/toast/dist/chunk-LDADOVIM.mjs
"use client";
var findById = (arr, id3) => arr.find((toast) => toast.id === id3);
function findToast(toasts, id3) {
  const position2 = getToastPosition(toasts, id3);
  const index2 = position2 ? toasts[position2].findIndex((toast) => toast.id === id3) : -1;
  return {
    position: position2,
    index: index2
  };
}
function getToastPosition(toasts, id3) {
  for (const [position2, values] of Object.entries(toasts)) {
    if (findById(values, id3)) {
      return position2;
    }
  }
}
function getToastStyle(position2) {
  const isRighty = position2.includes("right");
  const isLefty = position2.includes("left");
  let alignItems = "center";
  if (isRighty)
    alignItems = "flex-end";
  if (isLefty)
    alignItems = "flex-start";
  return {
    display: "flex",
    flexDirection: "column",
    alignItems
  };
}
function getToastListStyle(position2) {
  const isTopOrBottom = position2 === "top" || position2 === "bottom";
  const margin = isTopOrBottom ? "0 auto" : void 0;
  const top2 = position2.includes("top") ? "env(safe-area-inset-top, 0px)" : void 0;
  const bottom2 = position2.includes("bottom") ? "env(safe-area-inset-bottom, 0px)" : void 0;
  const right2 = !position2.includes("left") ? "env(safe-area-inset-right, 0px)" : void 0;
  const left2 = !position2.includes("right") ? "env(safe-area-inset-left, 0px)" : void 0;
  return {
    position: "fixed",
    zIndex: "var(--toast-z-index, 5500)",
    pointerEvents: "none",
    display: "flex",
    flexDirection: "column",
    margin,
    top: top2,
    bottom: bottom2,
    right: right2,
    left: left2
  };
}

// node_modules/@chakra-ui/react-use-timeout/dist/index.mjs
var import_react20 = __toESM(require_react(), 1);

// node_modules/@chakra-ui/react-use-callback-ref/dist/index.mjs
var import_react19 = __toESM(require_react(), 1);
"use client";
function useCallbackRef(callback, deps = []) {
  const callbackRef = (0, import_react19.useRef)(callback);
  (0, import_react19.useEffect)(() => {
    callbackRef.current = callback;
  });
  return (0, import_react19.useCallback)((...args) => {
    var _a7;
    return (_a7 = callbackRef.current) == null ? void 0 : _a7.call(callbackRef, ...args);
  }, deps);
}

// node_modules/@chakra-ui/react-use-timeout/dist/index.mjs
"use client";
function useTimeout(callback, delay2) {
  const fn2 = useCallbackRef(callback);
  (0, import_react20.useEffect)(() => {
    if (delay2 == null)
      return void 0;
    let timeoutId = null;
    timeoutId = window.setTimeout(() => {
      fn2();
    }, delay2);
    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [delay2, fn2]);
}

// node_modules/@chakra-ui/react-use-update-effect/dist/index.mjs
var import_react21 = __toESM(require_react(), 1);
"use client";
function useUpdateEffect(callback, deps) {
  const renderCycleRef = (0, import_react21.useRef)(false);
  const effectCycleRef = (0, import_react21.useRef)(false);
  (0, import_react21.useEffect)(() => {
    const mounted = renderCycleRef.current;
    const run = mounted && effectCycleRef.current;
    if (run) {
      return callback();
    }
    effectCycleRef.current = true;
  }, deps);
  (0, import_react21.useEffect)(() => {
    renderCycleRef.current = true;
    return () => {
      renderCycleRef.current = false;
    };
  }, []);
}

// node_modules/framer-motion/dist/es/motion/index.mjs
var React3 = __toESM(require_react(), 1);
var import_react32 = __toESM(require_react(), 1);

// node_modules/framer-motion/dist/es/context/MotionConfigContext.mjs
var import_react22 = __toESM(require_react(), 1);
var MotionConfigContext = (0, import_react22.createContext)({
  transformPagePoint: (p) => p,
  isStatic: false,
  reducedMotion: "never"
});

// node_modules/framer-motion/dist/es/context/MotionContext/index.mjs
var import_react23 = __toESM(require_react(), 1);
var MotionContext = (0, import_react23.createContext)({});

// node_modules/framer-motion/dist/es/motion/utils/use-visual-element.mjs
var import_react27 = __toESM(require_react(), 1);

// node_modules/framer-motion/dist/es/context/PresenceContext.mjs
var import_react24 = __toESM(require_react(), 1);
var PresenceContext = (0, import_react24.createContext)(null);

// node_modules/framer-motion/dist/es/utils/use-isomorphic-effect.mjs
var import_react25 = __toESM(require_react(), 1);

// node_modules/framer-motion/dist/es/utils/is-browser.mjs
var isBrowser = typeof document !== "undefined";

// node_modules/framer-motion/dist/es/utils/use-isomorphic-effect.mjs
var useIsomorphicLayoutEffect = isBrowser ? import_react25.useLayoutEffect : import_react25.useEffect;

// node_modules/framer-motion/dist/es/context/LazyContext.mjs
var import_react26 = __toESM(require_react(), 1);
var LazyContext = (0, import_react26.createContext)({ strict: false });

// node_modules/framer-motion/dist/es/render/dom/utils/camel-to-dash.mjs
var camelToDash = (str) => str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

// node_modules/framer-motion/dist/es/animation/optimized-appear/data-id.mjs
var optimizedAppearDataId = "framerAppearId";
var optimizedAppearDataAttribute = "data-" + camelToDash(optimizedAppearDataId);

// node_modules/framer-motion/dist/es/utils/GlobalConfig.mjs
var MotionGlobalConfig = {
  skipAnimations: false,
  useManualTiming: false
};

// node_modules/framer-motion/dist/es/frameloop/render-step.mjs
var Queue = class {
  constructor() {
    this.order = [];
    this.scheduled = /* @__PURE__ */ new Set();
  }
  add(process2) {
    if (!this.scheduled.has(process2)) {
      this.scheduled.add(process2);
      this.order.push(process2);
      return true;
    }
  }
  remove(process2) {
    const index2 = this.order.indexOf(process2);
    if (index2 !== -1) {
      this.order.splice(index2, 1);
      this.scheduled.delete(process2);
    }
  }
  clear() {
    this.order.length = 0;
    this.scheduled.clear();
  }
};
function createRenderStep(runNextFrame) {
  let thisFrame = new Queue();
  let nextFrame = new Queue();
  let numToRun = 0;
  let isProcessing = false;
  let flushNextFrame = false;
  const toKeepAlive = /* @__PURE__ */ new WeakSet();
  const step = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (callback, keepAlive = false, immediate = false) => {
      const addToCurrentFrame = immediate && isProcessing;
      const queue = addToCurrentFrame ? thisFrame : nextFrame;
      if (keepAlive)
        toKeepAlive.add(callback);
      if (queue.add(callback) && addToCurrentFrame && isProcessing) {
        numToRun = thisFrame.order.length;
      }
      return callback;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (callback) => {
      nextFrame.remove(callback);
      toKeepAlive.delete(callback);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (frameData2) => {
      if (isProcessing) {
        flushNextFrame = true;
        return;
      }
      isProcessing = true;
      [thisFrame, nextFrame] = [nextFrame, thisFrame];
      nextFrame.clear();
      numToRun = thisFrame.order.length;
      if (numToRun) {
        for (let i = 0; i < numToRun; i++) {
          const callback = thisFrame.order[i];
          if (toKeepAlive.has(callback)) {
            step.schedule(callback);
            runNextFrame();
          }
          callback(frameData2);
        }
      }
      isProcessing = false;
      if (flushNextFrame) {
        flushNextFrame = false;
        step.process(frameData2);
      }
    }
  };
  return step;
}

// node_modules/framer-motion/dist/es/frameloop/batcher.mjs
var stepsOrder = [
  "prepare",
  "read",
  "update",
  "preRender",
  "render",
  "postRender"
];
var maxElapsed = 40;
function createRenderBatcher(scheduleNextBatch, allowKeepAlive) {
  let runNextFrame = false;
  let useDefaultElapsed = true;
  const state2 = {
    delta: 0,
    timestamp: 0,
    isProcessing: false
  };
  const steps2 = stepsOrder.reduce((acc, key) => {
    acc[key] = createRenderStep(() => runNextFrame = true);
    return acc;
  }, {});
  const processStep = (stepId) => {
    steps2[stepId].process(state2);
  };
  const processBatch = () => {
    const timestamp = MotionGlobalConfig.useManualTiming ? state2.timestamp : performance.now();
    runNextFrame = false;
    state2.delta = useDefaultElapsed ? 1e3 / 60 : Math.max(Math.min(timestamp - state2.timestamp, maxElapsed), 1);
    state2.timestamp = timestamp;
    state2.isProcessing = true;
    stepsOrder.forEach(processStep);
    state2.isProcessing = false;
    if (runNextFrame && allowKeepAlive) {
      useDefaultElapsed = false;
      scheduleNextBatch(processBatch);
    }
  };
  const wake = () => {
    runNextFrame = true;
    useDefaultElapsed = true;
    if (!state2.isProcessing) {
      scheduleNextBatch(processBatch);
    }
  };
  const schedule = stepsOrder.reduce((acc, key) => {
    const step = steps2[key];
    acc[key] = (process2, keepAlive = false, immediate = false) => {
      if (!runNextFrame)
        wake();
      return step.schedule(process2, keepAlive, immediate);
    };
    return acc;
  }, {});
  const cancel = (process2) => stepsOrder.forEach((key) => steps2[key].cancel(process2));
  return { schedule, cancel, state: state2, steps: steps2 };
}

// node_modules/framer-motion/dist/es/frameloop/microtask.mjs
var { schedule: microtask, cancel: cancelMicrotask } = createRenderBatcher(queueMicrotask, false);

// node_modules/framer-motion/dist/es/motion/utils/use-visual-element.mjs
function useVisualElement(Component2, visualState, props, createVisualElement) {
  const { visualElement: parent } = (0, import_react27.useContext)(MotionContext);
  const lazyContext = (0, import_react27.useContext)(LazyContext);
  const presenceContext = (0, import_react27.useContext)(PresenceContext);
  const reducedMotionConfig = (0, import_react27.useContext)(MotionConfigContext).reducedMotion;
  const visualElementRef = (0, import_react27.useRef)();
  createVisualElement = createVisualElement || lazyContext.renderer;
  if (!visualElementRef.current && createVisualElement) {
    visualElementRef.current = createVisualElement(Component2, {
      visualState,
      parent,
      props,
      presenceContext,
      blockInitialAnimation: presenceContext ? presenceContext.initial === false : false,
      reducedMotionConfig
    });
  }
  const visualElement = visualElementRef.current;
  (0, import_react27.useInsertionEffect)(() => {
    visualElement && visualElement.update(props, presenceContext);
  });
  const wantsHandoff = (0, import_react27.useRef)(Boolean(props[optimizedAppearDataAttribute] && !window.HandoffComplete));
  useIsomorphicLayoutEffect(() => {
    if (!visualElement)
      return;
    microtask.postRender(visualElement.render);
    if (wantsHandoff.current && visualElement.animationState) {
      visualElement.animationState.animateChanges();
    }
  });
  (0, import_react27.useEffect)(() => {
    if (!visualElement)
      return;
    visualElement.updateFeatures();
    if (!wantsHandoff.current && visualElement.animationState) {
      visualElement.animationState.animateChanges();
    }
    if (wantsHandoff.current) {
      wantsHandoff.current = false;
      window.HandoffComplete = true;
    }
  });
  return visualElement;
}

// node_modules/framer-motion/dist/es/motion/utils/use-motion-ref.mjs
var import_react28 = __toESM(require_react(), 1);

// node_modules/framer-motion/dist/es/utils/is-ref-object.mjs
function isRefObject(ref) {
  return ref && typeof ref === "object" && Object.prototype.hasOwnProperty.call(ref, "current");
}

// node_modules/framer-motion/dist/es/motion/utils/use-motion-ref.mjs
function useMotionRef(visualState, visualElement, externalRef) {
  return (0, import_react28.useCallback)(
    (instance) => {
      instance && visualState.mount && visualState.mount(instance);
      if (visualElement) {
        instance ? visualElement.mount(instance) : visualElement.unmount();
      }
      if (externalRef) {
        if (typeof externalRef === "function") {
          externalRef(instance);
        } else if (isRefObject(externalRef)) {
          externalRef.current = instance;
        }
      }
    },
    /**
     * Only pass a new ref callback to React if we've received a visual element
     * factory. Otherwise we'll be mounting/remounting every time externalRef
     * or other dependencies change.
     */
    [visualElement]
  );
}

// node_modules/framer-motion/dist/es/context/MotionContext/create.mjs
var import_react29 = __toESM(require_react(), 1);

// node_modules/framer-motion/dist/es/render/utils/is-variant-label.mjs
function isVariantLabel(v) {
  return typeof v === "string" || Array.isArray(v);
}

// node_modules/framer-motion/dist/es/animation/utils/is-animation-controls.mjs
function isAnimationControls(v) {
  return v !== null && typeof v === "object" && typeof v.start === "function";
}

// node_modules/framer-motion/dist/es/render/utils/variant-props.mjs
var variantPriorityOrder = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
];
var variantProps = ["initial", ...variantPriorityOrder];

// node_modules/framer-motion/dist/es/render/utils/is-controlling-variants.mjs
function isControllingVariants(props) {
  return isAnimationControls(props.animate) || variantProps.some((name) => isVariantLabel(props[name]));
}
function isVariantNode(props) {
  return Boolean(isControllingVariants(props) || props.variants);
}

// node_modules/framer-motion/dist/es/context/MotionContext/utils.mjs
function getCurrentTreeVariants(props, context) {
  if (isControllingVariants(props)) {
    const { initial, animate } = props;
    return {
      initial: initial === false || isVariantLabel(initial) ? initial : void 0,
      animate: isVariantLabel(animate) ? animate : void 0
    };
  }
  return props.inherit !== false ? context : {};
}

// node_modules/framer-motion/dist/es/context/MotionContext/create.mjs
function useCreateMotionContext(props) {
  const { initial, animate } = getCurrentTreeVariants(props, (0, import_react29.useContext)(MotionContext));
  return (0, import_react29.useMemo)(() => ({ initial, animate }), [variantLabelsAsDependency(initial), variantLabelsAsDependency(animate)]);
}
function variantLabelsAsDependency(prop) {
  return Array.isArray(prop) ? prop.join(" ") : prop;
}

// node_modules/framer-motion/dist/es/motion/features/definitions.mjs
var featureProps = {
  animation: [
    "animate",
    "variants",
    "whileHover",
    "whileTap",
    "exit",
    "whileInView",
    "whileFocus",
    "whileDrag"
  ],
  exit: ["exit"],
  drag: ["drag", "dragControls"],
  focus: ["whileFocus"],
  hover: ["whileHover", "onHoverStart", "onHoverEnd"],
  tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
  pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
  inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
  layout: ["layout", "layoutId"]
};
var featureDefinitions = {};
for (const key in featureProps) {
  featureDefinitions[key] = {
    isEnabled: (props) => featureProps[key].some((name) => !!props[name])
  };
}

// node_modules/framer-motion/dist/es/motion/features/load-features.mjs
function loadFeatures(features) {
  for (const key in features) {
    featureDefinitions[key] = {
      ...featureDefinitions[key],
      ...features[key]
    };
  }
}

// node_modules/framer-motion/dist/es/context/LayoutGroupContext.mjs
var import_react30 = __toESM(require_react(), 1);
var LayoutGroupContext = (0, import_react30.createContext)({});

// node_modules/framer-motion/dist/es/context/SwitchLayoutGroupContext.mjs
var import_react31 = __toESM(require_react(), 1);
var SwitchLayoutGroupContext = (0, import_react31.createContext)({});

// node_modules/framer-motion/dist/es/motion/utils/symbol.mjs
var motionComponentSymbol = Symbol.for("motionComponentSymbol");

// node_modules/framer-motion/dist/es/motion/index.mjs
function createMotionComponent({ preloadedFeatures: preloadedFeatures2, createVisualElement, useRender, useVisualState, Component: Component2 }) {
  preloadedFeatures2 && loadFeatures(preloadedFeatures2);
  function MotionComponent(props, externalRef) {
    let MeasureLayout2;
    const configAndProps = {
      ...(0, import_react32.useContext)(MotionConfigContext),
      ...props,
      layoutId: useLayoutId(props)
    };
    const { isStatic } = configAndProps;
    const context = useCreateMotionContext(props);
    const visualState = useVisualState(props, isStatic);
    if (!isStatic && isBrowser) {
      context.visualElement = useVisualElement(Component2, visualState, configAndProps, createVisualElement);
      const initialLayoutGroupConfig = (0, import_react32.useContext)(SwitchLayoutGroupContext);
      const isStrict = (0, import_react32.useContext)(LazyContext).strict;
      if (context.visualElement) {
        MeasureLayout2 = context.visualElement.loadFeatures(
          // Note: Pass the full new combined props to correctly re-render dynamic feature components.
          configAndProps,
          isStrict,
          preloadedFeatures2,
          initialLayoutGroupConfig
        );
      }
    }
    return React3.createElement(
      MotionContext.Provider,
      { value: context },
      MeasureLayout2 && context.visualElement ? React3.createElement(MeasureLayout2, { visualElement: context.visualElement, ...configAndProps }) : null,
      useRender(Component2, props, useMotionRef(visualState, context.visualElement, externalRef), visualState, isStatic, context.visualElement)
    );
  }
  const ForwardRefComponent = (0, import_react32.forwardRef)(MotionComponent);
  ForwardRefComponent[motionComponentSymbol] = Component2;
  return ForwardRefComponent;
}
function useLayoutId({ layoutId }) {
  const layoutGroupId = (0, import_react32.useContext)(LayoutGroupContext).id;
  return layoutGroupId && layoutId !== void 0 ? layoutGroupId + "-" + layoutId : layoutId;
}

// node_modules/framer-motion/dist/es/render/dom/motion-proxy.mjs
function createMotionProxy(createConfig) {
  function custom(Component2, customMotionComponentConfig = {}) {
    return createMotionComponent(createConfig(Component2, customMotionComponentConfig));
  }
  if (typeof Proxy === "undefined") {
    return custom;
  }
  const componentCache = /* @__PURE__ */ new Map();
  return new Proxy(custom, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (_target, key) => {
      if (!componentCache.has(key)) {
        componentCache.set(key, custom(key));
      }
      return componentCache.get(key);
    }
  });
}

// node_modules/framer-motion/dist/es/render/svg/lowercase-elements.mjs
var lowercaseSVGElements = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view"
];

// node_modules/framer-motion/dist/es/render/dom/utils/is-svg-component.mjs
function isSVGComponent(Component2) {
  if (
    /**
     * If it's not a string, it's a custom React component. Currently we only support
     * HTML custom React components.
     */
    typeof Component2 !== "string" || /**
     * If it contains a dash, the element is a custom HTML webcomponent.
     */
    Component2.includes("-")
  ) {
    return false;
  } else if (
    /**
     * If it's in our list of lowercase SVG tags, it's an SVG component
     */
    lowercaseSVGElements.indexOf(Component2) > -1 || /**
     * If it contains a capital letter, it's an SVG component
     */
    /[A-Z]/.test(Component2)
  ) {
    return true;
  }
  return false;
}

// node_modules/framer-motion/dist/es/render/dom/use-render.mjs
var import_react35 = __toESM(require_react(), 1);

// node_modules/framer-motion/dist/es/render/html/use-props.mjs
var import_react33 = __toESM(require_react(), 1);

// node_modules/framer-motion/dist/es/projection/styles/scale-correction.mjs
var scaleCorrectors = {};
function addScaleCorrector(correctors) {
  Object.assign(scaleCorrectors, correctors);
}

// node_modules/framer-motion/dist/es/render/html/utils/transform.mjs
var transformPropOrder = [
  "transformPerspective",
  "x",
  "y",
  "z",
  "translateX",
  "translateY",
  "translateZ",
  "scale",
  "scaleX",
  "scaleY",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "skew",
  "skewX",
  "skewY"
];
var transformProps = new Set(transformPropOrder);

// node_modules/framer-motion/dist/es/motion/utils/is-forced-motion-value.mjs
function isForcedMotionValue(key, { layout: layout3, layoutId }) {
  return transformProps.has(key) || key.startsWith("origin") || (layout3 || layoutId !== void 0) && (!!scaleCorrectors[key] || key === "opacity");
}

// node_modules/framer-motion/dist/es/value/utils/is-motion-value.mjs
var isMotionValue = (value) => Boolean(value && value.getVelocity);

// node_modules/framer-motion/dist/es/render/html/utils/build-transform.mjs
var translateAlias = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
};
var numTransforms = transformPropOrder.length;
function buildTransform(transform2, { enableHardwareAcceleration = true, allowTransformNone = true }, transformIsDefault, transformTemplate2) {
  let transformString = "";
  for (let i = 0; i < numTransforms; i++) {
    const key = transformPropOrder[i];
    if (transform2[key] !== void 0) {
      const transformName = translateAlias[key] || key;
      transformString += `${transformName}(${transform2[key]}) `;
    }
  }
  if (enableHardwareAcceleration && !transform2.z) {
    transformString += "translateZ(0)";
  }
  transformString = transformString.trim();
  if (transformTemplate2) {
    transformString = transformTemplate2(transform2, transformIsDefault ? "" : transformString);
  } else if (allowTransformNone && transformIsDefault) {
    transformString = "none";
  }
  return transformString;
}

// node_modules/framer-motion/dist/es/render/dom/utils/is-css-variable.mjs
var checkStringStartsWith = (token) => (key) => typeof key === "string" && key.startsWith(token);
var isCSSVariableName = checkStringStartsWith("--");
var startsAsVariableToken = checkStringStartsWith("var(--");
var isCSSVariableToken = (value) => {
  const startsWithToken = startsAsVariableToken(value);
  if (!startsWithToken)
    return false;
  return singleCssVariableRegex.test(value.split("/*")[0].trim());
};
var singleCssVariableRegex = /var\s*\(\s*--[\w-]+(\s*,\s*(?:(?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)+)?\s*\)$/i;

// node_modules/framer-motion/dist/es/render/dom/value-types/get-as-type.mjs
var getValueAsType = (value, type) => {
  return type && typeof value === "number" ? type.transform(value) : value;
};

// node_modules/framer-motion/dist/es/utils/clamp.mjs
var clamp = (min2, max2, v) => {
  if (v > max2)
    return max2;
  if (v < min2)
    return min2;
  return v;
};

// node_modules/framer-motion/dist/es/value/types/numbers/index.mjs
var number = {
  test: (v) => typeof v === "number",
  parse: parseFloat,
  transform: (v) => v
};
var alpha = {
  ...number,
  transform: (v) => clamp(0, 1, v)
};
var scale = {
  ...number,
  default: 1
};

// node_modules/framer-motion/dist/es/value/types/utils.mjs
var sanitize = (v) => Math.round(v * 1e5) / 1e5;
var floatRegex = /(-)?([\d]*\.?[\d])+/g;
var colorRegex = /(#[0-9a-f]{3,8}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))/gi;
var singleColorRegex = /^(#[0-9a-f]{3,8}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))$/i;
function isString(v) {
  return typeof v === "string";
}

// node_modules/framer-motion/dist/es/value/types/numbers/units.mjs
var createUnitType = (unit) => ({
  test: (v) => isString(v) && v.endsWith(unit) && v.split(" ").length === 1,
  parse: parseFloat,
  transform: (v) => `${v}${unit}`
});
var degrees = createUnitType("deg");
var percent = createUnitType("%");
var px2 = createUnitType("px");
var vh = createUnitType("vh");
var vw = createUnitType("vw");
var progressPercentage = {
  ...percent,
  parse: (v) => percent.parse(v) / 100,
  transform: (v) => percent.transform(v * 100)
};

// node_modules/framer-motion/dist/es/render/dom/value-types/type-int.mjs
var int = {
  ...number,
  transform: Math.round
};

// node_modules/framer-motion/dist/es/render/dom/value-types/number.mjs
var numberValueTypes = {
  // Border props
  borderWidth: px2,
  borderTopWidth: px2,
  borderRightWidth: px2,
  borderBottomWidth: px2,
  borderLeftWidth: px2,
  borderRadius: px2,
  radius: px2,
  borderTopLeftRadius: px2,
  borderTopRightRadius: px2,
  borderBottomRightRadius: px2,
  borderBottomLeftRadius: px2,
  // Positioning props
  width: px2,
  maxWidth: px2,
  height: px2,
  maxHeight: px2,
  size: px2,
  top: px2,
  right: px2,
  bottom: px2,
  left: px2,
  // Spacing props
  padding: px2,
  paddingTop: px2,
  paddingRight: px2,
  paddingBottom: px2,
  paddingLeft: px2,
  margin: px2,
  marginTop: px2,
  marginRight: px2,
  marginBottom: px2,
  marginLeft: px2,
  // Transform props
  rotate: degrees,
  rotateX: degrees,
  rotateY: degrees,
  rotateZ: degrees,
  scale,
  scaleX: scale,
  scaleY: scale,
  scaleZ: scale,
  skew: degrees,
  skewX: degrees,
  skewY: degrees,
  distance: px2,
  translateX: px2,
  translateY: px2,
  translateZ: px2,
  x: px2,
  y: px2,
  z: px2,
  perspective: px2,
  transformPerspective: px2,
  opacity: alpha,
  originX: progressPercentage,
  originY: progressPercentage,
  originZ: px2,
  // Misc
  zIndex: int,
  // SVG
  fillOpacity: alpha,
  strokeOpacity: alpha,
  numOctaves: int
};

// node_modules/framer-motion/dist/es/render/html/utils/build-styles.mjs
function buildHTMLStyles(state2, latestValues, options, transformTemplate2) {
  const { style, vars: vars2, transform: transform2, transformOrigin: transformOrigin2 } = state2;
  let hasTransform2 = false;
  let hasTransformOrigin = false;
  let transformIsNone = true;
  for (const key in latestValues) {
    const value = latestValues[key];
    if (isCSSVariableName(key)) {
      vars2[key] = value;
      continue;
    }
    const valueType = numberValueTypes[key];
    const valueAsType = getValueAsType(value, valueType);
    if (transformProps.has(key)) {
      hasTransform2 = true;
      transform2[key] = valueAsType;
      if (!transformIsNone)
        continue;
      if (value !== (valueType.default || 0))
        transformIsNone = false;
    } else if (key.startsWith("origin")) {
      hasTransformOrigin = true;
      transformOrigin2[key] = valueAsType;
    } else {
      style[key] = valueAsType;
    }
  }
  if (!latestValues.transform) {
    if (hasTransform2 || transformTemplate2) {
      style.transform = buildTransform(state2.transform, options, transformIsNone, transformTemplate2);
    } else if (style.transform) {
      style.transform = "none";
    }
  }
  if (hasTransformOrigin) {
    const { originX = "50%", originY = "50%", originZ = 0 } = transformOrigin2;
    style.transformOrigin = `${originX} ${originY} ${originZ}`;
  }
}

// node_modules/framer-motion/dist/es/render/html/utils/create-render-state.mjs
var createHtmlRenderState = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});

// node_modules/framer-motion/dist/es/render/html/use-props.mjs
function copyRawValuesOnly(target, source, props) {
  for (const key in source) {
    if (!isMotionValue(source[key]) && !isForcedMotionValue(key, props)) {
      target[key] = source[key];
    }
  }
}
function useInitialMotionValues({ transformTemplate: transformTemplate2 }, visualState, isStatic) {
  return (0, import_react33.useMemo)(() => {
    const state2 = createHtmlRenderState();
    buildHTMLStyles(state2, visualState, { enableHardwareAcceleration: !isStatic }, transformTemplate2);
    return Object.assign({}, state2.vars, state2.style);
  }, [visualState]);
}
function useStyle(props, visualState, isStatic) {
  const styleProp = props.style || {};
  const style = {};
  copyRawValuesOnly(style, styleProp, props);
  Object.assign(style, useInitialMotionValues(props, visualState, isStatic));
  return style;
}
function useHTMLProps(props, visualState, isStatic) {
  const htmlProps = {};
  const style = useStyle(props, visualState, isStatic);
  if (props.drag && props.dragListener !== false) {
    htmlProps.draggable = false;
    style.userSelect = style.WebkitUserSelect = style.WebkitTouchCallout = "none";
    style.touchAction = props.drag === true ? "none" : `pan-${props.drag === "x" ? "y" : "x"}`;
  }
  if (props.tabIndex === void 0 && (props.onTap || props.onTapStart || props.whileTap)) {
    htmlProps.tabIndex = 0;
  }
  htmlProps.style = style;
  return htmlProps;
}

// node_modules/framer-motion/dist/es/motion/utils/valid-prop.mjs
var validMotionProps = /* @__PURE__ */ new Set([
  "animate",
  "exit",
  "variants",
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "custom",
  "inherit",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "_dragX",
  "_dragY",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "globalTapTarget",
  "ignoreStrict",
  "viewport"
]);
function isValidMotionProp(key) {
  return key.startsWith("while") || key.startsWith("drag") && key !== "draggable" || key.startsWith("layout") || key.startsWith("onTap") || key.startsWith("onPan") || key.startsWith("onLayout") || validMotionProps.has(key);
}

// node_modules/framer-motion/dist/es/render/dom/utils/filter-props.mjs
var shouldForward = (key) => !isValidMotionProp(key);
function loadExternalIsValidProp(isValidProp) {
  if (!isValidProp)
    return;
  shouldForward = (key) => key.startsWith("on") ? !isValidMotionProp(key) : isValidProp(key);
}
try {
  loadExternalIsValidProp((init_is_prop_valid_browser_esm(), __toCommonJS(is_prop_valid_browser_esm_exports)).default);
} catch (_a7) {
}
function filterProps(props, isDom, forwardMotionProps) {
  const filteredProps = {};
  for (const key in props) {
    if (key === "values" && typeof props.values === "object")
      continue;
    if (shouldForward(key) || forwardMotionProps === true && isValidMotionProp(key) || !isDom && !isValidMotionProp(key) || // If trying to use native HTML drag events, forward drag listeners
    props["draggable"] && key.startsWith("onDrag")) {
      filteredProps[key] = props[key];
    }
  }
  return filteredProps;
}

// node_modules/framer-motion/dist/es/render/svg/use-props.mjs
var import_react34 = __toESM(require_react(), 1);

// node_modules/framer-motion/dist/es/render/svg/utils/transform-origin.mjs
function calcOrigin(origin, offset2, size2) {
  return typeof origin === "string" ? origin : px2.transform(offset2 + size2 * origin);
}
function calcSVGTransformOrigin(dimensions, originX, originY) {
  const pxOriginX = calcOrigin(originX, dimensions.x, dimensions.width);
  const pxOriginY = calcOrigin(originY, dimensions.y, dimensions.height);
  return `${pxOriginX} ${pxOriginY}`;
}

// node_modules/framer-motion/dist/es/render/svg/utils/path.mjs
var dashKeys = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
};
var camelKeys = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function buildSVGPath(attrs, length, spacing2 = 1, offset2 = 0, useDashCase = true) {
  attrs.pathLength = 1;
  const keys2 = useDashCase ? dashKeys : camelKeys;
  attrs[keys2.offset] = px2.transform(-offset2);
  const pathLength = px2.transform(length);
  const pathSpacing = px2.transform(spacing2);
  attrs[keys2.array] = `${pathLength} ${pathSpacing}`;
}

// node_modules/framer-motion/dist/es/render/svg/utils/build-attrs.mjs
function buildSVGAttrs(state2, {
  attrX,
  attrY,
  attrScale,
  originX,
  originY,
  pathLength,
  pathSpacing = 1,
  pathOffset = 0,
  // This is object creation, which we try to avoid per-frame.
  ...latest
}, options, isSVGTag2, transformTemplate2) {
  buildHTMLStyles(state2, latest, options, transformTemplate2);
  if (isSVGTag2) {
    if (state2.style.viewBox) {
      state2.attrs.viewBox = state2.style.viewBox;
    }
    return;
  }
  state2.attrs = state2.style;
  state2.style = {};
  const { attrs, style, dimensions } = state2;
  if (attrs.transform) {
    if (dimensions)
      style.transform = attrs.transform;
    delete attrs.transform;
  }
  if (dimensions && (originX !== void 0 || originY !== void 0 || style.transform)) {
    style.transformOrigin = calcSVGTransformOrigin(dimensions, originX !== void 0 ? originX : 0.5, originY !== void 0 ? originY : 0.5);
  }
  if (attrX !== void 0)
    attrs.x = attrX;
  if (attrY !== void 0)
    attrs.y = attrY;
  if (attrScale !== void 0)
    attrs.scale = attrScale;
  if (pathLength !== void 0) {
    buildSVGPath(attrs, pathLength, pathSpacing, pathOffset, false);
  }
}

// node_modules/framer-motion/dist/es/render/svg/utils/create-render-state.mjs
var createSvgRenderState = () => ({
  ...createHtmlRenderState(),
  attrs: {}
});

// node_modules/framer-motion/dist/es/render/svg/utils/is-svg-tag.mjs
var isSVGTag = (tag) => typeof tag === "string" && tag.toLowerCase() === "svg";

// node_modules/framer-motion/dist/es/render/svg/use-props.mjs
function useSVGProps(props, visualState, _isStatic, Component2) {
  const visualProps = (0, import_react34.useMemo)(() => {
    const state2 = createSvgRenderState();
    buildSVGAttrs(state2, visualState, { enableHardwareAcceleration: false }, isSVGTag(Component2), props.transformTemplate);
    return {
      ...state2.attrs,
      style: { ...state2.style }
    };
  }, [visualState]);
  if (props.style) {
    const rawStyles = {};
    copyRawValuesOnly(rawStyles, props.style, props);
    visualProps.style = { ...rawStyles, ...visualProps.style };
  }
  return visualProps;
}

// node_modules/framer-motion/dist/es/render/dom/use-render.mjs
function createUseRender(forwardMotionProps = false) {
  const useRender = (Component2, props, ref, { latestValues }, isStatic) => {
    const useVisualProps = isSVGComponent(Component2) ? useSVGProps : useHTMLProps;
    const visualProps = useVisualProps(props, latestValues, isStatic, Component2);
    const filteredProps = filterProps(props, typeof Component2 === "string", forwardMotionProps);
    const elementProps = Component2 !== import_react35.Fragment ? { ...filteredProps, ...visualProps, ref } : {};
    const { children } = props;
    const renderedChildren = (0, import_react35.useMemo)(() => isMotionValue(children) ? children.get() : children, [children]);
    return (0, import_react35.createElement)(Component2, {
      ...elementProps,
      children: renderedChildren
    });
  };
  return useRender;
}

// node_modules/framer-motion/dist/es/render/html/utils/render.mjs
function renderHTML(element, { style, vars: vars2 }, styleProp, projection) {
  Object.assign(element.style, style, projection && projection.getProjectionStyles(styleProp));
  for (const key in vars2) {
    element.style.setProperty(key, vars2[key]);
  }
}

// node_modules/framer-motion/dist/es/render/svg/utils/camel-case-attrs.mjs
var camelCaseAttributes = /* @__PURE__ */ new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust"
]);

// node_modules/framer-motion/dist/es/render/svg/utils/render.mjs
function renderSVG(element, renderState, _styleProp, projection) {
  renderHTML(element, renderState, void 0, projection);
  for (const key in renderState.attrs) {
    element.setAttribute(!camelCaseAttributes.has(key) ? camelToDash(key) : key, renderState.attrs[key]);
  }
}

// node_modules/framer-motion/dist/es/render/html/utils/scrape-motion-values.mjs
function scrapeMotionValuesFromProps(props, prevProps) {
  const { style } = props;
  const newValues = {};
  for (const key in style) {
    if (isMotionValue(style[key]) || prevProps.style && isMotionValue(prevProps.style[key]) || isForcedMotionValue(key, props)) {
      newValues[key] = style[key];
    }
  }
  return newValues;
}

// node_modules/framer-motion/dist/es/render/svg/utils/scrape-motion-values.mjs
function scrapeMotionValuesFromProps2(props, prevProps) {
  const newValues = scrapeMotionValuesFromProps(props, prevProps);
  for (const key in props) {
    if (isMotionValue(props[key]) || isMotionValue(prevProps[key])) {
      const targetKey = transformPropOrder.indexOf(key) !== -1 ? "attr" + key.charAt(0).toUpperCase() + key.substring(1) : key;
      newValues[targetKey] = props[key];
    }
  }
  return newValues;
}

// node_modules/framer-motion/dist/es/motion/utils/use-visual-state.mjs
var import_react37 = __toESM(require_react(), 1);

// node_modules/framer-motion/dist/es/render/utils/resolve-variants.mjs
function resolveVariantFromProps(props, definition, custom, currentValues = {}, currentVelocity = {}) {
  if (typeof definition === "function") {
    definition = definition(custom !== void 0 ? custom : props.custom, currentValues, currentVelocity);
  }
  if (typeof definition === "string") {
    definition = props.variants && props.variants[definition];
  }
  if (typeof definition === "function") {
    definition = definition(custom !== void 0 ? custom : props.custom, currentValues, currentVelocity);
  }
  return definition;
}

// node_modules/framer-motion/dist/es/utils/use-constant.mjs
var import_react36 = __toESM(require_react(), 1);
function useConstant(init) {
  const ref = (0, import_react36.useRef)(null);
  if (ref.current === null) {
    ref.current = init();
  }
  return ref.current;
}

// node_modules/framer-motion/dist/es/animation/utils/is-keyframes-target.mjs
var isKeyframesTarget = (v) => {
  return Array.isArray(v);
};

// node_modules/framer-motion/dist/es/utils/resolve-value.mjs
var isCustomValue = (v) => {
  return Boolean(v && typeof v === "object" && v.mix && v.toValue);
};
var resolveFinalValueInKeyframes = (v) => {
  return isKeyframesTarget(v) ? v[v.length - 1] || 0 : v;
};

// node_modules/framer-motion/dist/es/value/utils/resolve-motion-value.mjs
function resolveMotionValue(value) {
  const unwrappedValue = isMotionValue(value) ? value.get() : value;
  return isCustomValue(unwrappedValue) ? unwrappedValue.toValue() : unwrappedValue;
}

// node_modules/framer-motion/dist/es/motion/utils/use-visual-state.mjs
function makeState({ scrapeMotionValuesFromProps: scrapeMotionValuesFromProps3, createRenderState, onMount }, props, context, presenceContext) {
  const state2 = {
    latestValues: makeLatestValues(props, context, presenceContext, scrapeMotionValuesFromProps3),
    renderState: createRenderState()
  };
  if (onMount) {
    state2.mount = (instance) => onMount(props, instance, state2);
  }
  return state2;
}
var makeUseVisualState = (config2) => (props, isStatic) => {
  const context = (0, import_react37.useContext)(MotionContext);
  const presenceContext = (0, import_react37.useContext)(PresenceContext);
  const make = () => makeState(config2, props, context, presenceContext);
  return isStatic ? make() : useConstant(make);
};
function makeLatestValues(props, context, presenceContext, scrapeMotionValues) {
  const values = {};
  const motionValues = scrapeMotionValues(props, {});
  for (const key in motionValues) {
    values[key] = resolveMotionValue(motionValues[key]);
  }
  let { initial, animate } = props;
  const isControllingVariants$1 = isControllingVariants(props);
  const isVariantNode$1 = isVariantNode(props);
  if (context && isVariantNode$1 && !isControllingVariants$1 && props.inherit !== false) {
    if (initial === void 0)
      initial = context.initial;
    if (animate === void 0)
      animate = context.animate;
  }
  let isInitialAnimationBlocked = presenceContext ? presenceContext.initial === false : false;
  isInitialAnimationBlocked = isInitialAnimationBlocked || initial === false;
  const variantToSet = isInitialAnimationBlocked ? animate : initial;
  if (variantToSet && typeof variantToSet !== "boolean" && !isAnimationControls(variantToSet)) {
    const list2 = Array.isArray(variantToSet) ? variantToSet : [variantToSet];
    list2.forEach((definition) => {
      const resolved = resolveVariantFromProps(props, definition);
      if (!resolved)
        return;
      const { transitionEnd, transition: transition3, ...target } = resolved;
      for (const key in target) {
        let valueTarget = target[key];
        if (Array.isArray(valueTarget)) {
          const index2 = isInitialAnimationBlocked ? valueTarget.length - 1 : 0;
          valueTarget = valueTarget[index2];
        }
        if (valueTarget !== null) {
          values[key] = valueTarget;
        }
      }
      for (const key in transitionEnd)
        values[key] = transitionEnd[key];
    });
  }
  return values;
}

// node_modules/framer-motion/dist/es/utils/noop.mjs
var noop3 = (any) => any;

// node_modules/framer-motion/dist/es/frameloop/frame.mjs
var { schedule: frame, cancel: cancelFrame, state: frameData, steps } = createRenderBatcher(typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : noop3, true);

// node_modules/framer-motion/dist/es/render/svg/config-motion.mjs
var svgMotionConfig = {
  useVisualState: makeUseVisualState({
    scrapeMotionValuesFromProps: scrapeMotionValuesFromProps2,
    createRenderState: createSvgRenderState,
    onMount: (props, instance, { renderState, latestValues }) => {
      frame.read(() => {
        try {
          renderState.dimensions = typeof instance.getBBox === "function" ? instance.getBBox() : instance.getBoundingClientRect();
        } catch (e) {
          renderState.dimensions = {
            x: 0,
            y: 0,
            width: 0,
            height: 0
          };
        }
      });
      frame.render(() => {
        buildSVGAttrs(renderState, latestValues, { enableHardwareAcceleration: false }, isSVGTag(instance.tagName), props.transformTemplate);
        renderSVG(instance, renderState);
      });
    }
  })
};

// node_modules/framer-motion/dist/es/render/html/config-motion.mjs
var htmlMotionConfig = {
  useVisualState: makeUseVisualState({
    scrapeMotionValuesFromProps,
    createRenderState: createHtmlRenderState
  })
};

// node_modules/framer-motion/dist/es/render/dom/utils/create-config.mjs
function createDomMotionConfig(Component2, { forwardMotionProps = false }, preloadedFeatures2, createVisualElement) {
  const baseConfig = isSVGComponent(Component2) ? svgMotionConfig : htmlMotionConfig;
  return {
    ...baseConfig,
    preloadedFeatures: preloadedFeatures2,
    useRender: createUseRender(forwardMotionProps),
    createVisualElement,
    Component: Component2
  };
}

// node_modules/framer-motion/dist/es/events/add-dom-event.mjs
function addDomEvent(target, eventName, handler, options = { passive: true }) {
  target.addEventListener(eventName, handler, options);
  return () => target.removeEventListener(eventName, handler);
}

// node_modules/framer-motion/dist/es/events/utils/is-primary-pointer.mjs
var isPrimaryPointer = (event) => {
  if (event.pointerType === "mouse") {
    return typeof event.button !== "number" || event.button <= 0;
  } else {
    return event.isPrimary !== false;
  }
};

// node_modules/framer-motion/dist/es/events/event-info.mjs
function extractEventInfo(event, pointType = "page") {
  return {
    point: {
      x: event[pointType + "X"],
      y: event[pointType + "Y"]
    }
  };
}
var addPointerInfo = (handler) => {
  return (event) => isPrimaryPointer(event) && handler(event, extractEventInfo(event));
};

// node_modules/framer-motion/dist/es/events/add-pointer-event.mjs
function addPointerEvent(target, eventName, handler, options) {
  return addDomEvent(target, eventName, addPointerInfo(handler), options);
}

// node_modules/framer-motion/dist/es/utils/pipe.mjs
var combineFunctions = (a, b) => (v) => b(a(v));
var pipe3 = (...transformers) => transformers.reduce(combineFunctions);

// node_modules/framer-motion/dist/es/gestures/drag/utils/lock.mjs
function createLock(name) {
  let lock = null;
  return () => {
    const openLock = () => {
      lock = null;
    };
    if (lock === null) {
      lock = name;
      return openLock;
    }
    return false;
  };
}
var globalHorizontalLock = createLock("dragHorizontal");
var globalVerticalLock = createLock("dragVertical");
function getGlobalLock(drag2) {
  let lock = false;
  if (drag2 === "y") {
    lock = globalVerticalLock();
  } else if (drag2 === "x") {
    lock = globalHorizontalLock();
  } else {
    const openHorizontal = globalHorizontalLock();
    const openVertical = globalVerticalLock();
    if (openHorizontal && openVertical) {
      lock = () => {
        openHorizontal();
        openVertical();
      };
    } else {
      if (openHorizontal)
        openHorizontal();
      if (openVertical)
        openVertical();
    }
  }
  return lock;
}
function isDragActive() {
  const openGestureLock = getGlobalLock(true);
  if (!openGestureLock)
    return true;
  openGestureLock();
  return false;
}

// node_modules/framer-motion/dist/es/motion/features/Feature.mjs
var Feature = class {
  constructor(node) {
    this.isMounted = false;
    this.node = node;
  }
  update() {
  }
};

// node_modules/framer-motion/dist/es/gestures/hover.mjs
function addHoverEvent(node, isActive) {
  const eventName = "pointer" + (isActive ? "enter" : "leave");
  const callbackName = "onHover" + (isActive ? "Start" : "End");
  const handleEvent = (event, info) => {
    if (event.pointerType === "touch" || isDragActive())
      return;
    const props = node.getProps();
    if (node.animationState && props.whileHover) {
      node.animationState.setActive("whileHover", isActive);
    }
    if (props[callbackName]) {
      frame.update(() => props[callbackName](event, info));
    }
  };
  return addPointerEvent(node.current, eventName, handleEvent, {
    passive: !node.getProps()[callbackName]
  });
}
var HoverGesture = class extends Feature {
  mount() {
    this.unmount = pipe3(addHoverEvent(this.node, true), addHoverEvent(this.node, false));
  }
  unmount() {
  }
};

// node_modules/framer-motion/dist/es/gestures/focus.mjs
var FocusGesture = class extends Feature {
  constructor() {
    super(...arguments);
    this.isActive = false;
  }
  onFocus() {
    let isFocusVisible = false;
    try {
      isFocusVisible = this.node.current.matches(":focus-visible");
    } catch (e) {
      isFocusVisible = true;
    }
    if (!isFocusVisible || !this.node.animationState)
      return;
    this.node.animationState.setActive("whileFocus", true);
    this.isActive = true;
  }
  onBlur() {
    if (!this.isActive || !this.node.animationState)
      return;
    this.node.animationState.setActive("whileFocus", false);
    this.isActive = false;
  }
  mount() {
    this.unmount = pipe3(addDomEvent(this.node.current, "focus", () => this.onFocus()), addDomEvent(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
};

// node_modules/framer-motion/dist/es/gestures/utils/is-node-or-child.mjs
var isNodeOrChild = (parent, child) => {
  if (!child) {
    return false;
  } else if (parent === child) {
    return true;
  } else {
    return isNodeOrChild(parent, child.parentElement);
  }
};

// node_modules/framer-motion/dist/es/gestures/press.mjs
function fireSyntheticPointerEvent(name, handler) {
  if (!handler)
    return;
  const syntheticPointerEvent = new PointerEvent("pointer" + name);
  handler(syntheticPointerEvent, extractEventInfo(syntheticPointerEvent));
}
var PressGesture = class extends Feature {
  constructor() {
    super(...arguments);
    this.removeStartListeners = noop3;
    this.removeEndListeners = noop3;
    this.removeAccessibleListeners = noop3;
    this.startPointerPress = (startEvent, startInfo) => {
      if (this.isPressing)
        return;
      this.removeEndListeners();
      const props = this.node.getProps();
      const endPointerPress = (endEvent, endInfo) => {
        if (!this.checkPressEnd())
          return;
        const { onTap, onTapCancel, globalTapTarget } = this.node.getProps();
        frame.update(() => {
          !globalTapTarget && !isNodeOrChild(this.node.current, endEvent.target) ? onTapCancel && onTapCancel(endEvent, endInfo) : onTap && onTap(endEvent, endInfo);
        });
      };
      const removePointerUpListener = addPointerEvent(window, "pointerup", endPointerPress, { passive: !(props.onTap || props["onPointerUp"]) });
      const removePointerCancelListener = addPointerEvent(window, "pointercancel", (cancelEvent, cancelInfo) => this.cancelPress(cancelEvent, cancelInfo), { passive: !(props.onTapCancel || props["onPointerCancel"]) });
      this.removeEndListeners = pipe3(removePointerUpListener, removePointerCancelListener);
      this.startPress(startEvent, startInfo);
    };
    this.startAccessiblePress = () => {
      const handleKeydown = (keydownEvent) => {
        if (keydownEvent.key !== "Enter" || this.isPressing)
          return;
        const handleKeyup = (keyupEvent) => {
          if (keyupEvent.key !== "Enter" || !this.checkPressEnd())
            return;
          fireSyntheticPointerEvent("up", (event, info) => {
            const { onTap } = this.node.getProps();
            if (onTap) {
              frame.update(() => onTap(event, info));
            }
          });
        };
        this.removeEndListeners();
        this.removeEndListeners = addDomEvent(this.node.current, "keyup", handleKeyup);
        fireSyntheticPointerEvent("down", (event, info) => {
          this.startPress(event, info);
        });
      };
      const removeKeydownListener = addDomEvent(this.node.current, "keydown", handleKeydown);
      const handleBlur = () => {
        if (!this.isPressing)
          return;
        fireSyntheticPointerEvent("cancel", (cancelEvent, cancelInfo) => this.cancelPress(cancelEvent, cancelInfo));
      };
      const removeBlurListener = addDomEvent(this.node.current, "blur", handleBlur);
      this.removeAccessibleListeners = pipe3(removeKeydownListener, removeBlurListener);
    };
  }
  startPress(event, info) {
    this.isPressing = true;
    const { onTapStart, whileTap } = this.node.getProps();
    if (whileTap && this.node.animationState) {
      this.node.animationState.setActive("whileTap", true);
    }
    if (onTapStart) {
      frame.update(() => onTapStart(event, info));
    }
  }
  checkPressEnd() {
    this.removeEndListeners();
    this.isPressing = false;
    const props = this.node.getProps();
    if (props.whileTap && this.node.animationState) {
      this.node.animationState.setActive("whileTap", false);
    }
    return !isDragActive();
  }
  cancelPress(event, info) {
    if (!this.checkPressEnd())
      return;
    const { onTapCancel } = this.node.getProps();
    if (onTapCancel) {
      frame.update(() => onTapCancel(event, info));
    }
  }
  mount() {
    const props = this.node.getProps();
    const removePointerListener = addPointerEvent(props.globalTapTarget ? window : this.node.current, "pointerdown", this.startPointerPress, { passive: !(props.onTapStart || props["onPointerStart"]) });
    const removeFocusListener = addDomEvent(this.node.current, "focus", this.startAccessiblePress);
    this.removeStartListeners = pipe3(removePointerListener, removeFocusListener);
  }
  unmount() {
    this.removeStartListeners();
    this.removeEndListeners();
    this.removeAccessibleListeners();
  }
};

// node_modules/framer-motion/dist/es/motion/features/viewport/observers.mjs
var observerCallbacks = /* @__PURE__ */ new WeakMap();
var observers = /* @__PURE__ */ new WeakMap();
var fireObserverCallback = (entry) => {
  const callback = observerCallbacks.get(entry.target);
  callback && callback(entry);
};
var fireAllObserverCallbacks = (entries) => {
  entries.forEach(fireObserverCallback);
};
function initIntersectionObserver({ root, ...options }) {
  const lookupRoot = root || document;
  if (!observers.has(lookupRoot)) {
    observers.set(lookupRoot, {});
  }
  const rootObservers = observers.get(lookupRoot);
  const key = JSON.stringify(options);
  if (!rootObservers[key]) {
    rootObservers[key] = new IntersectionObserver(fireAllObserverCallbacks, { root, ...options });
  }
  return rootObservers[key];
}
function observeIntersection(element, options, callback) {
  const rootInteresectionObserver = initIntersectionObserver(options);
  observerCallbacks.set(element, callback);
  rootInteresectionObserver.observe(element);
  return () => {
    observerCallbacks.delete(element);
    rootInteresectionObserver.unobserve(element);
  };
}

// node_modules/framer-motion/dist/es/motion/features/viewport/index.mjs
var thresholdNames = {
  some: 0,
  all: 1
};
var InViewFeature = class extends Feature {
  constructor() {
    super(...arguments);
    this.hasEnteredView = false;
    this.isInView = false;
  }
  startObserver() {
    this.unmount();
    const { viewport: viewport2 = {} } = this.node.getProps();
    const { root, margin: rootMargin, amount = "some", once: once2 } = viewport2;
    const options = {
      root: root ? root.current : void 0,
      rootMargin,
      threshold: typeof amount === "number" ? amount : thresholdNames[amount]
    };
    const onIntersectionUpdate = (entry) => {
      const { isIntersecting } = entry;
      if (this.isInView === isIntersecting)
        return;
      this.isInView = isIntersecting;
      if (once2 && !isIntersecting && this.hasEnteredView) {
        return;
      } else if (isIntersecting) {
        this.hasEnteredView = true;
      }
      if (this.node.animationState) {
        this.node.animationState.setActive("whileInView", isIntersecting);
      }
      const { onViewportEnter, onViewportLeave } = this.node.getProps();
      const callback = isIntersecting ? onViewportEnter : onViewportLeave;
      callback && callback(entry);
    };
    return observeIntersection(this.node.current, options, onIntersectionUpdate);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver === "undefined")
      return;
    const { props, prevProps } = this.node;
    const hasOptionsChanged = ["amount", "margin", "root"].some(hasViewportOptionChanged(props, prevProps));
    if (hasOptionsChanged) {
      this.startObserver();
    }
  }
  unmount() {
  }
};
function hasViewportOptionChanged({ viewport: viewport2 = {} }, { viewport: prevViewport = {} } = {}) {
  return (name) => viewport2[name] !== prevViewport[name];
}

// node_modules/framer-motion/dist/es/motion/features/gestures.mjs
var gestureAnimations = {
  inView: {
    Feature: InViewFeature
  },
  tap: {
    Feature: PressGesture
  },
  focus: {
    Feature: FocusGesture
  },
  hover: {
    Feature: HoverGesture
  }
};

// node_modules/framer-motion/dist/es/utils/shallow-compare.mjs
function shallowCompare(next, prev) {
  if (!Array.isArray(prev))
    return false;
  const prevLength = prev.length;
  if (prevLength !== next.length)
    return false;
  for (let i = 0; i < prevLength; i++) {
    if (prev[i] !== next[i])
      return false;
  }
  return true;
}

// node_modules/framer-motion/dist/es/render/utils/resolve-dynamic-variants.mjs
function getCurrent(visualElement) {
  const current = {};
  visualElement.values.forEach((value, key) => current[key] = value.get());
  return current;
}
function getVelocity(visualElement) {
  const velocity = {};
  visualElement.values.forEach((value, key) => velocity[key] = value.getVelocity());
  return velocity;
}
function resolveVariant(visualElement, definition, custom) {
  const props = visualElement.getProps();
  return resolveVariantFromProps(props, definition, custom !== void 0 ? custom : props.custom, getCurrent(visualElement), getVelocity(visualElement));
}

// node_modules/framer-motion/dist/es/utils/errors.mjs
var warning = noop3;
var invariant = noop3;
if (true) {
  warning = (check, message) => {
    if (!check && typeof console !== "undefined") {
      console.warn(message);
    }
  };
  invariant = (check, message) => {
    if (!check) {
      throw new Error(message);
    }
  };
}

// node_modules/framer-motion/dist/es/utils/time-conversion.mjs
var secondsToMilliseconds = (seconds) => seconds * 1e3;
var millisecondsToSeconds = (milliseconds) => milliseconds / 1e3;

// node_modules/framer-motion/dist/es/utils/use-instant-transition-state.mjs
var instantAnimationState = {
  current: false
};

// node_modules/framer-motion/dist/es/easing/utils/is-bezier-definition.mjs
var isBezierDefinition = (easing) => Array.isArray(easing) && typeof easing[0] === "number";

// node_modules/framer-motion/dist/es/animation/animators/waapi/easing.mjs
function isWaapiSupportedEasing(easing) {
  return Boolean(!easing || typeof easing === "string" && supportedWaapiEasing[easing] || isBezierDefinition(easing) || Array.isArray(easing) && easing.every(isWaapiSupportedEasing));
}
var cubicBezierAsString = ([a, b, c, d]) => `cubic-bezier(${a}, ${b}, ${c}, ${d})`;
var supportedWaapiEasing = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: cubicBezierAsString([0, 0.65, 0.55, 1]),
  circOut: cubicBezierAsString([0.55, 0, 1, 0.45]),
  backIn: cubicBezierAsString([0.31, 0.01, 0.66, -0.59]),
  backOut: cubicBezierAsString([0.33, 1.53, 0.69, 0.99])
};
function mapEasingToNativeEasing(easing) {
  if (!easing)
    return void 0;
  return isBezierDefinition(easing) ? cubicBezierAsString(easing) : Array.isArray(easing) ? easing.map(mapEasingToNativeEasing) : supportedWaapiEasing[easing];
}

// node_modules/framer-motion/dist/es/animation/animators/waapi/index.mjs
function animateStyle(element, valueName, keyframes3, { delay: delay2 = 0, duration, repeat = 0, repeatType = "loop", ease: ease2, times } = {}) {
  const keyframeOptions = { [valueName]: keyframes3 };
  if (times)
    keyframeOptions.offset = times;
  const easing = mapEasingToNativeEasing(ease2);
  if (Array.isArray(easing))
    keyframeOptions.easing = easing;
  return element.animate(keyframeOptions, {
    delay: delay2,
    duration,
    easing: !Array.isArray(easing) ? easing : "linear",
    fill: "both",
    iterations: repeat + 1,
    direction: repeatType === "reverse" ? "alternate" : "normal"
  });
}

// node_modules/framer-motion/dist/es/animation/animators/waapi/utils/get-final-keyframe.mjs
function getFinalKeyframe(keyframes3, { repeat, repeatType = "loop" }) {
  const index2 = repeat && repeatType !== "loop" && repeat % 2 === 1 ? 0 : keyframes3.length - 1;
  return keyframes3[index2];
}

// node_modules/framer-motion/dist/es/easing/cubic-bezier.mjs
var calcBezier = (t2, a1, a2) => (((1 - 3 * a2 + 3 * a1) * t2 + (3 * a2 - 6 * a1)) * t2 + 3 * a1) * t2;
var subdivisionPrecision = 1e-7;
var subdivisionMaxIterations = 12;
function binarySubdivide(x, lowerBound, upperBound, mX1, mX2) {
  let currentX;
  let currentT;
  let i = 0;
  do {
    currentT = lowerBound + (upperBound - lowerBound) / 2;
    currentX = calcBezier(currentT, mX1, mX2) - x;
    if (currentX > 0) {
      upperBound = currentT;
    } else {
      lowerBound = currentT;
    }
  } while (Math.abs(currentX) > subdivisionPrecision && ++i < subdivisionMaxIterations);
  return currentT;
}
function cubicBezier(mX1, mY1, mX2, mY2) {
  if (mX1 === mY1 && mX2 === mY2)
    return noop3;
  const getTForX = (aX) => binarySubdivide(aX, 0, 1, mX1, mX2);
  return (t2) => t2 === 0 || t2 === 1 ? t2 : calcBezier(getTForX(t2), mY1, mY2);
}

// node_modules/framer-motion/dist/es/easing/ease.mjs
var easeIn = cubicBezier(0.42, 0, 1, 1);
var easeOut = cubicBezier(0, 0, 0.58, 1);
var easeInOut = cubicBezier(0.42, 0, 0.58, 1);

// node_modules/framer-motion/dist/es/easing/utils/is-easing-array.mjs
var isEasingArray = (ease2) => {
  return Array.isArray(ease2) && typeof ease2[0] !== "number";
};

// node_modules/framer-motion/dist/es/easing/modifiers/mirror.mjs
var mirrorEasing = (easing) => (p) => p <= 0.5 ? easing(2 * p) / 2 : (2 - easing(2 * (1 - p))) / 2;

// node_modules/framer-motion/dist/es/easing/modifiers/reverse.mjs
var reverseEasing = (easing) => (p) => 1 - easing(1 - p);

// node_modules/framer-motion/dist/es/easing/circ.mjs
var circIn = (p) => 1 - Math.sin(Math.acos(p));
var circOut = reverseEasing(circIn);
var circInOut = mirrorEasing(circIn);

// node_modules/framer-motion/dist/es/easing/back.mjs
var backOut = cubicBezier(0.33, 1.53, 0.69, 0.99);
var backIn = reverseEasing(backOut);
var backInOut = mirrorEasing(backIn);

// node_modules/framer-motion/dist/es/easing/anticipate.mjs
var anticipate = (p) => (p *= 2) < 1 ? 0.5 * backIn(p) : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));

// node_modules/framer-motion/dist/es/easing/utils/map.mjs
var easingLookup = {
  linear: noop3,
  easeIn,
  easeInOut,
  easeOut,
  circIn,
  circInOut,
  circOut,
  backIn,
  backInOut,
  backOut,
  anticipate
};
var easingDefinitionToFunction = (definition) => {
  if (Array.isArray(definition)) {
    invariant(definition.length === 4, `Cubic bezier arrays must contain four numerical values.`);
    const [x1, y1, x2, y2] = definition;
    return cubicBezier(x1, y1, x2, y2);
  } else if (typeof definition === "string") {
    invariant(easingLookup[definition] !== void 0, `Invalid easing type '${definition}'`);
    return easingLookup[definition];
  }
  return definition;
};

// node_modules/framer-motion/dist/es/utils/progress.mjs
var progress = (from, to, value) => {
  const toFromDifference = to - from;
  return toFromDifference === 0 ? 1 : (value - from) / toFromDifference;
};

// node_modules/framer-motion/dist/es/utils/mix/number.mjs
var mixNumber = (from, to, progress2) => {
  return from + (to - from) * progress2;
};

// node_modules/framer-motion/dist/es/utils/hsla-to-rgba.mjs
function hueToRgb(p, q, t2) {
  if (t2 < 0)
    t2 += 1;
  if (t2 > 1)
    t2 -= 1;
  if (t2 < 1 / 6)
    return p + (q - p) * 6 * t2;
  if (t2 < 1 / 2)
    return q;
  if (t2 < 2 / 3)
    return p + (q - p) * (2 / 3 - t2) * 6;
  return p;
}
function hslaToRgba({ hue, saturation, lightness, alpha: alpha2 }) {
  hue /= 360;
  saturation /= 100;
  lightness /= 100;
  let red = 0;
  let green = 0;
  let blue = 0;
  if (!saturation) {
    red = green = blue = lightness;
  } else {
    const q = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
    const p = 2 * lightness - q;
    red = hueToRgb(p, q, hue + 1 / 3);
    green = hueToRgb(p, q, hue);
    blue = hueToRgb(p, q, hue - 1 / 3);
  }
  return {
    red: Math.round(red * 255),
    green: Math.round(green * 255),
    blue: Math.round(blue * 255),
    alpha: alpha2
  };
}

// node_modules/framer-motion/dist/es/value/types/color/utils.mjs
var isColorString = (type, testProp) => (v) => {
  return Boolean(isString(v) && singleColorRegex.test(v) && v.startsWith(type) || testProp && Object.prototype.hasOwnProperty.call(v, testProp));
};
var splitColor = (aName, bName, cName) => (v) => {
  if (!isString(v))
    return v;
  const [a, b, c, alpha2] = v.match(floatRegex);
  return {
    [aName]: parseFloat(a),
    [bName]: parseFloat(b),
    [cName]: parseFloat(c),
    alpha: alpha2 !== void 0 ? parseFloat(alpha2) : 1
  };
};

// node_modules/framer-motion/dist/es/value/types/color/rgba.mjs
var clampRgbUnit = (v) => clamp(0, 255, v);
var rgbUnit = {
  ...number,
  transform: (v) => Math.round(clampRgbUnit(v))
};
var rgba2 = {
  test: isColorString("rgb", "red"),
  parse: splitColor("red", "green", "blue"),
  transform: ({ red, green, blue, alpha: alpha$1 = 1 }) => "rgba(" + rgbUnit.transform(red) + ", " + rgbUnit.transform(green) + ", " + rgbUnit.transform(blue) + ", " + sanitize(alpha.transform(alpha$1)) + ")"
};

// node_modules/framer-motion/dist/es/value/types/color/hex.mjs
function parseHex(v) {
  let r2 = "";
  let g = "";
  let b = "";
  let a = "";
  if (v.length > 5) {
    r2 = v.substring(1, 3);
    g = v.substring(3, 5);
    b = v.substring(5, 7);
    a = v.substring(7, 9);
  } else {
    r2 = v.substring(1, 2);
    g = v.substring(2, 3);
    b = v.substring(3, 4);
    a = v.substring(4, 5);
    r2 += r2;
    g += g;
    b += b;
    a += a;
  }
  return {
    red: parseInt(r2, 16),
    green: parseInt(g, 16),
    blue: parseInt(b, 16),
    alpha: a ? parseInt(a, 16) / 255 : 1
  };
}
var hex = {
  test: isColorString("#"),
  parse: parseHex,
  transform: rgba2.transform
};

// node_modules/framer-motion/dist/es/value/types/color/hsla.mjs
var hsla2 = {
  test: isColorString("hsl", "hue"),
  parse: splitColor("hue", "saturation", "lightness"),
  transform: ({ hue, saturation, lightness, alpha: alpha$1 = 1 }) => {
    return "hsla(" + Math.round(hue) + ", " + percent.transform(sanitize(saturation)) + ", " + percent.transform(sanitize(lightness)) + ", " + sanitize(alpha.transform(alpha$1)) + ")";
  }
};

// node_modules/framer-motion/dist/es/utils/mix/color.mjs
var mixLinearColor = (from, to, v) => {
  const fromExpo = from * from;
  const expo = v * (to * to - fromExpo) + fromExpo;
  return expo < 0 ? 0 : Math.sqrt(expo);
};
var colorTypes = [hex, rgba2, hsla2];
var getColorType = (v) => colorTypes.find((type) => type.test(v));
function asRGBA(color3) {
  const type = getColorType(color3);
  invariant(Boolean(type), `'${color3}' is not an animatable color. Use the equivalent color code instead.`);
  let model = type.parse(color3);
  if (type === hsla2) {
    model = hslaToRgba(model);
  }
  return model;
}
var mixColor = (from, to) => {
  const fromRGBA = asRGBA(from);
  const toRGBA = asRGBA(to);
  const blended = { ...fromRGBA };
  return (v) => {
    blended.red = mixLinearColor(fromRGBA.red, toRGBA.red, v);
    blended.green = mixLinearColor(fromRGBA.green, toRGBA.green, v);
    blended.blue = mixLinearColor(fromRGBA.blue, toRGBA.blue, v);
    blended.alpha = mixNumber(fromRGBA.alpha, toRGBA.alpha, v);
    return rgba2.transform(blended);
  };
};

// node_modules/framer-motion/dist/es/value/types/color/index.mjs
var color2 = {
  test: (v) => rgba2.test(v) || hex.test(v) || hsla2.test(v),
  parse: (v) => {
    if (rgba2.test(v)) {
      return rgba2.parse(v);
    } else if (hsla2.test(v)) {
      return hsla2.parse(v);
    } else {
      return hex.parse(v);
    }
  },
  transform: (v) => {
    return isString(v) ? v : v.hasOwnProperty("red") ? rgba2.transform(v) : hsla2.transform(v);
  }
};

// node_modules/framer-motion/dist/es/value/types/complex/index.mjs
function test(v) {
  var _a7, _b5;
  return isNaN(v) && isString(v) && (((_a7 = v.match(floatRegex)) === null || _a7 === void 0 ? void 0 : _a7.length) || 0) + (((_b5 = v.match(colorRegex)) === null || _b5 === void 0 ? void 0 : _b5.length) || 0) > 0;
}
var NUMBER_TOKEN = "number";
var COLOR_TOKEN = "color";
var VAR_TOKEN = "var";
var VAR_FUNCTION_TOKEN = "var(";
var SPLIT_TOKEN = "${}";
var complexRegex = /(var\s*\(\s*--[\w-]+(\s*,\s*(?:(?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)+)?\s*\))|(#[0-9a-f]{3,8}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))|((-)?([\d]*\.?[\d])+)/gi;
function analyseComplexValue(value) {
  const originalValue = value.toString();
  const matchedValues = originalValue.match(complexRegex) || [];
  const values = [];
  const indexes = {
    color: [],
    number: [],
    var: []
  };
  const types2 = [];
  for (let i = 0; i < matchedValues.length; i++) {
    const parsedValue = matchedValues[i];
    if (color2.test(parsedValue)) {
      indexes.color.push(i);
      types2.push(COLOR_TOKEN);
      values.push(color2.parse(parsedValue));
    } else if (parsedValue.startsWith(VAR_FUNCTION_TOKEN)) {
      indexes.var.push(i);
      types2.push(VAR_TOKEN);
      values.push(parsedValue);
    } else {
      indexes.number.push(i);
      types2.push(NUMBER_TOKEN);
      values.push(parseFloat(parsedValue));
    }
  }
  const tokenised = originalValue.replace(complexRegex, SPLIT_TOKEN);
  const split2 = tokenised.split(SPLIT_TOKEN);
  return { values, split: split2, indexes, types: types2 };
}
function parseComplexValue(v) {
  return analyseComplexValue(v).values;
}
function createTransformer(source) {
  const { split: split2, types: types2 } = analyseComplexValue(source);
  const numSections = split2.length;
  return (v) => {
    let output = "";
    for (let i = 0; i < numSections; i++) {
      output += split2[i];
      if (v[i] !== void 0) {
        const type = types2[i];
        if (type === NUMBER_TOKEN) {
          output += sanitize(v[i]);
        } else if (type === COLOR_TOKEN) {
          output += color2.transform(v[i]);
        } else {
          output += v[i];
        }
      }
    }
    return output;
  };
}
var convertNumbersToZero = (v) => typeof v === "number" ? 0 : v;
function getAnimatableNone(v) {
  const parsed = parseComplexValue(v);
  const transformer = createTransformer(v);
  return transformer(parsed.map(convertNumbersToZero));
}
var complex = {
  test,
  parse: parseComplexValue,
  createTransformer,
  getAnimatableNone
};

// node_modules/framer-motion/dist/es/utils/mix/complex.mjs
function mixImmediate(a, b) {
  return (p) => p > 0 ? b : a;
}
function mixNumber2(a, b) {
  return (p) => mixNumber(a, b, p);
}
function getMixer(a) {
  if (typeof a === "number") {
    return mixNumber2;
  } else if (typeof a === "string") {
    return isCSSVariableToken(a) ? mixImmediate : color2.test(a) ? mixColor : mixComplex;
  } else if (Array.isArray(a)) {
    return mixArray;
  } else if (typeof a === "object") {
    return color2.test(a) ? mixColor : mixObject;
  }
  return mixImmediate;
}
function mixArray(a, b) {
  const output = [...a];
  const numValues = output.length;
  const blendValue = a.map((v, i) => getMixer(v)(v, b[i]));
  return (p) => {
    for (let i = 0; i < numValues; i++) {
      output[i] = blendValue[i](p);
    }
    return output;
  };
}
function mixObject(a, b) {
  const output = { ...a, ...b };
  const blendValue = {};
  for (const key in output) {
    if (a[key] !== void 0 && b[key] !== void 0) {
      blendValue[key] = getMixer(a[key])(a[key], b[key]);
    }
  }
  return (v) => {
    for (const key in blendValue) {
      output[key] = blendValue[key](v);
    }
    return output;
  };
}
function matchOrder(origin, target) {
  var _a7;
  const orderedOrigin = [];
  const pointers = { color: 0, var: 0, number: 0 };
  for (let i = 0; i < target.values.length; i++) {
    const type = target.types[i];
    const originIndex = origin.indexes[type][pointers[type]];
    const originValue = (_a7 = origin.values[originIndex]) !== null && _a7 !== void 0 ? _a7 : 0;
    orderedOrigin[i] = originValue;
    pointers[type]++;
  }
  return orderedOrigin;
}
var mixComplex = (origin, target) => {
  const template = complex.createTransformer(target);
  const originStats = analyseComplexValue(origin);
  const targetStats = analyseComplexValue(target);
  const canInterpolate = originStats.indexes.var.length === targetStats.indexes.var.length && originStats.indexes.color.length === targetStats.indexes.color.length && originStats.indexes.number.length >= targetStats.indexes.number.length;
  if (canInterpolate) {
    return pipe3(mixArray(matchOrder(originStats, targetStats), targetStats.values), template);
  } else {
    warning(true, `Complex values '${origin}' and '${target}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`);
    return mixImmediate(origin, target);
  }
};

// node_modules/framer-motion/dist/es/utils/mix/index.mjs
function mix2(from, to, p) {
  if (typeof from === "number" && typeof to === "number" && typeof p === "number") {
    return mixNumber(from, to, p);
  }
  const mixer = getMixer(from);
  return mixer(from, to);
}

// node_modules/framer-motion/dist/es/utils/interpolate.mjs
function createMixers(output, ease2, customMixer) {
  const mixers = [];
  const mixerFactory = customMixer || mix2;
  const numMixers = output.length - 1;
  for (let i = 0; i < numMixers; i++) {
    let mixer = mixerFactory(output[i], output[i + 1]);
    if (ease2) {
      const easingFunction = Array.isArray(ease2) ? ease2[i] || noop3 : ease2;
      mixer = pipe3(easingFunction, mixer);
    }
    mixers.push(mixer);
  }
  return mixers;
}
function interpolate(input, output, { clamp: isClamp = true, ease: ease2, mixer } = {}) {
  const inputLength = input.length;
  invariant(inputLength === output.length, "Both input and output ranges must be the same length");
  if (inputLength === 1)
    return () => output[0];
  if (input[0] > input[inputLength - 1]) {
    input = [...input].reverse();
    output = [...output].reverse();
  }
  const mixers = createMixers(output, ease2, mixer);
  const numMixers = mixers.length;
  const interpolator = (v) => {
    let i = 0;
    if (numMixers > 1) {
      for (; i < input.length - 2; i++) {
        if (v < input[i + 1])
          break;
      }
    }
    const progressInRange = progress(input[i], input[i + 1], v);
    return mixers[i](progressInRange);
  };
  return isClamp ? (v) => interpolator(clamp(input[0], input[inputLength - 1], v)) : interpolator;
}

// node_modules/framer-motion/dist/es/utils/offsets/fill.mjs
function fillOffset(offset2, remaining) {
  const min2 = offset2[offset2.length - 1];
  for (let i = 1; i <= remaining; i++) {
    const offsetProgress = progress(0, remaining, i);
    offset2.push(mixNumber(min2, 1, offsetProgress));
  }
}

// node_modules/framer-motion/dist/es/utils/offsets/default.mjs
function defaultOffset(arr) {
  const offset2 = [0];
  fillOffset(offset2, arr.length - 1);
  return offset2;
}

// node_modules/framer-motion/dist/es/utils/offsets/time.mjs
function convertOffsetToTimes(offset2, duration) {
  return offset2.map((o) => o * duration);
}

// node_modules/framer-motion/dist/es/animation/generators/keyframes.mjs
function defaultEasing(values, easing) {
  return values.map(() => easing || easeInOut).splice(0, values.length - 1);
}
function keyframes2({ duration = 300, keyframes: keyframeValues, times, ease: ease2 = "easeInOut" }) {
  const easingFunctions = isEasingArray(ease2) ? ease2.map(easingDefinitionToFunction) : easingDefinitionToFunction(ease2);
  const state2 = {
    done: false,
    value: keyframeValues[0]
  };
  const absoluteTimes = convertOffsetToTimes(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    times && times.length === keyframeValues.length ? times : defaultOffset(keyframeValues),
    duration
  );
  const mapTimeToKeyframe = interpolate(absoluteTimes, keyframeValues, {
    ease: Array.isArray(easingFunctions) ? easingFunctions : defaultEasing(keyframeValues, easingFunctions)
  });
  return {
    calculatedDuration: duration,
    next: (t2) => {
      state2.value = mapTimeToKeyframe(t2);
      state2.done = t2 >= duration;
      return state2;
    }
  };
}

// node_modules/framer-motion/dist/es/utils/velocity-per-second.mjs
function velocityPerSecond(velocity, frameDuration) {
  return frameDuration ? velocity * (1e3 / frameDuration) : 0;
}

// node_modules/framer-motion/dist/es/animation/generators/utils/velocity.mjs
var velocitySampleDuration = 5;
function calcGeneratorVelocity(resolveValue, t2, current) {
  const prevT = Math.max(t2 - velocitySampleDuration, 0);
  return velocityPerSecond(current - resolveValue(prevT), t2 - prevT);
}

// node_modules/framer-motion/dist/es/animation/generators/spring/find.mjs
var safeMin = 1e-3;
var minDuration = 0.01;
var maxDuration = 10;
var minDamping = 0.05;
var maxDamping = 1;
function findSpring({ duration = 800, bounce = 0.25, velocity = 0, mass = 1 }) {
  let envelope;
  let derivative;
  warning(duration <= secondsToMilliseconds(maxDuration), "Spring duration must be 10 seconds or less");
  let dampingRatio = 1 - bounce;
  dampingRatio = clamp(minDamping, maxDamping, dampingRatio);
  duration = clamp(minDuration, maxDuration, millisecondsToSeconds(duration));
  if (dampingRatio < 1) {
    envelope = (undampedFreq2) => {
      const exponentialDecay = undampedFreq2 * dampingRatio;
      const delta = exponentialDecay * duration;
      const a = exponentialDecay - velocity;
      const b = calcAngularFreq(undampedFreq2, dampingRatio);
      const c = Math.exp(-delta);
      return safeMin - a / b * c;
    };
    derivative = (undampedFreq2) => {
      const exponentialDecay = undampedFreq2 * dampingRatio;
      const delta = exponentialDecay * duration;
      const d = delta * velocity + velocity;
      const e = Math.pow(dampingRatio, 2) * Math.pow(undampedFreq2, 2) * duration;
      const f = Math.exp(-delta);
      const g = calcAngularFreq(Math.pow(undampedFreq2, 2), dampingRatio);
      const factor = -envelope(undampedFreq2) + safeMin > 0 ? -1 : 1;
      return factor * ((d - e) * f) / g;
    };
  } else {
    envelope = (undampedFreq2) => {
      const a = Math.exp(-undampedFreq2 * duration);
      const b = (undampedFreq2 - velocity) * duration + 1;
      return -safeMin + a * b;
    };
    derivative = (undampedFreq2) => {
      const a = Math.exp(-undampedFreq2 * duration);
      const b = (velocity - undampedFreq2) * (duration * duration);
      return a * b;
    };
  }
  const initialGuess = 5 / duration;
  const undampedFreq = approximateRoot(envelope, derivative, initialGuess);
  duration = secondsToMilliseconds(duration);
  if (isNaN(undampedFreq)) {
    return {
      stiffness: 100,
      damping: 10,
      duration
    };
  } else {
    const stiffness = Math.pow(undampedFreq, 2) * mass;
    return {
      stiffness,
      damping: dampingRatio * 2 * Math.sqrt(mass * stiffness),
      duration
    };
  }
}
var rootIterations = 12;
function approximateRoot(envelope, derivative, initialGuess) {
  let result = initialGuess;
  for (let i = 1; i < rootIterations; i++) {
    result = result - envelope(result) / derivative(result);
  }
  return result;
}
function calcAngularFreq(undampedFreq, dampingRatio) {
  return undampedFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
}

// node_modules/framer-motion/dist/es/animation/generators/spring/index.mjs
var durationKeys = ["duration", "bounce"];
var physicsKeys = ["stiffness", "damping", "mass"];
function isSpringType(options, keys2) {
  return keys2.some((key) => options[key] !== void 0);
}
function getSpringOptions(options) {
  let springOptions = {
    velocity: 0,
    stiffness: 100,
    damping: 10,
    mass: 1,
    isResolvedFromDuration: false,
    ...options
  };
  if (!isSpringType(options, physicsKeys) && isSpringType(options, durationKeys)) {
    const derived = findSpring(options);
    springOptions = {
      ...springOptions,
      ...derived,
      mass: 1
    };
    springOptions.isResolvedFromDuration = true;
  }
  return springOptions;
}
function spring({ keyframes: keyframes3, restDelta, restSpeed, ...options }) {
  const origin = keyframes3[0];
  const target = keyframes3[keyframes3.length - 1];
  const state2 = { done: false, value: origin };
  const { stiffness, damping, mass, duration, velocity, isResolvedFromDuration } = getSpringOptions({
    ...options,
    velocity: -millisecondsToSeconds(options.velocity || 0)
  });
  const initialVelocity = velocity || 0;
  const dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
  const initialDelta = target - origin;
  const undampedAngularFreq = millisecondsToSeconds(Math.sqrt(stiffness / mass));
  const isGranularScale = Math.abs(initialDelta) < 5;
  restSpeed || (restSpeed = isGranularScale ? 0.01 : 2);
  restDelta || (restDelta = isGranularScale ? 5e-3 : 0.5);
  let resolveSpring;
  if (dampingRatio < 1) {
    const angularFreq = calcAngularFreq(undampedAngularFreq, dampingRatio);
    resolveSpring = (t2) => {
      const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t2);
      return target - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq * Math.sin(angularFreq * t2) + initialDelta * Math.cos(angularFreq * t2));
    };
  } else if (dampingRatio === 1) {
    resolveSpring = (t2) => target - Math.exp(-undampedAngularFreq * t2) * (initialDelta + (initialVelocity + undampedAngularFreq * initialDelta) * t2);
  } else {
    const dampedAngularFreq = undampedAngularFreq * Math.sqrt(dampingRatio * dampingRatio - 1);
    resolveSpring = (t2) => {
      const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t2);
      const freqForT = Math.min(dampedAngularFreq * t2, 300);
      return target - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) * Math.sinh(freqForT) + dampedAngularFreq * initialDelta * Math.cosh(freqForT)) / dampedAngularFreq;
    };
  }
  return {
    calculatedDuration: isResolvedFromDuration ? duration || null : null,
    next: (t2) => {
      const current = resolveSpring(t2);
      if (!isResolvedFromDuration) {
        let currentVelocity = initialVelocity;
        if (t2 !== 0) {
          if (dampingRatio < 1) {
            currentVelocity = calcGeneratorVelocity(resolveSpring, t2, current);
          } else {
            currentVelocity = 0;
          }
        }
        const isBelowVelocityThreshold = Math.abs(currentVelocity) <= restSpeed;
        const isBelowDisplacementThreshold = Math.abs(target - current) <= restDelta;
        state2.done = isBelowVelocityThreshold && isBelowDisplacementThreshold;
      } else {
        state2.done = t2 >= duration;
      }
      state2.value = state2.done ? target : current;
      return state2;
    }
  };
}

// node_modules/framer-motion/dist/es/animation/generators/inertia.mjs
function inertia({ keyframes: keyframes3, velocity = 0, power = 0.8, timeConstant = 325, bounceDamping = 10, bounceStiffness = 500, modifyTarget, min: min2, max: max2, restDelta = 0.5, restSpeed }) {
  const origin = keyframes3[0];
  const state2 = {
    done: false,
    value: origin
  };
  const isOutOfBounds = (v) => min2 !== void 0 && v < min2 || max2 !== void 0 && v > max2;
  const nearestBoundary = (v) => {
    if (min2 === void 0)
      return max2;
    if (max2 === void 0)
      return min2;
    return Math.abs(min2 - v) < Math.abs(max2 - v) ? min2 : max2;
  };
  let amplitude = power * velocity;
  const ideal = origin + amplitude;
  const target = modifyTarget === void 0 ? ideal : modifyTarget(ideal);
  if (target !== ideal)
    amplitude = target - origin;
  const calcDelta = (t2) => -amplitude * Math.exp(-t2 / timeConstant);
  const calcLatest = (t2) => target + calcDelta(t2);
  const applyFriction = (t2) => {
    const delta = calcDelta(t2);
    const latest = calcLatest(t2);
    state2.done = Math.abs(delta) <= restDelta;
    state2.value = state2.done ? target : latest;
  };
  let timeReachedBoundary;
  let spring$1;
  const checkCatchBoundary = (t2) => {
    if (!isOutOfBounds(state2.value))
      return;
    timeReachedBoundary = t2;
    spring$1 = spring({
      keyframes: [state2.value, nearestBoundary(state2.value)],
      velocity: calcGeneratorVelocity(calcLatest, t2, state2.value),
      damping: bounceDamping,
      stiffness: bounceStiffness,
      restDelta,
      restSpeed
    });
  };
  checkCatchBoundary(0);
  return {
    calculatedDuration: null,
    next: (t2) => {
      let hasUpdatedFrame = false;
      if (!spring$1 && timeReachedBoundary === void 0) {
        hasUpdatedFrame = true;
        applyFriction(t2);
        checkCatchBoundary(t2);
      }
      if (timeReachedBoundary !== void 0 && t2 > timeReachedBoundary) {
        return spring$1.next(t2 - timeReachedBoundary);
      } else {
        !hasUpdatedFrame && applyFriction(t2);
        return state2;
      }
    }
  };
}

// node_modules/framer-motion/dist/es/frameloop/sync-time.mjs
var now;
function clearTime() {
  now = void 0;
}
var time = {
  now: () => {
    if (now === void 0) {
      time.set(frameData.isProcessing || MotionGlobalConfig.useManualTiming ? frameData.timestamp : performance.now());
    }
    return now;
  },
  set: (newTime) => {
    now = newTime;
    queueMicrotask(clearTime);
  }
};

// node_modules/framer-motion/dist/es/animation/animators/js/driver-frameloop.mjs
var frameloopDriver = (update) => {
  const passTimestamp = ({ timestamp }) => update(timestamp);
  return {
    start: () => frame.update(passTimestamp, true),
    stop: () => cancelFrame(passTimestamp),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => frameData.isProcessing ? frameData.timestamp : time.now()
  };
};

// node_modules/framer-motion/dist/es/animation/generators/utils/calc-duration.mjs
var maxGeneratorDuration = 2e4;
function calcGeneratorDuration(generator) {
  let duration = 0;
  const timeStep = 50;
  let state2 = generator.next(duration);
  while (!state2.done && duration < maxGeneratorDuration) {
    duration += timeStep;
    state2 = generator.next(duration);
  }
  return duration >= maxGeneratorDuration ? Infinity : duration;
}

// node_modules/framer-motion/dist/es/animation/animators/js/index.mjs
var types = {
  decay: inertia,
  inertia,
  tween: keyframes2,
  keyframes: keyframes2,
  spring
};
var percentToProgress = (percent2) => percent2 / 100;
function animateValue({ autoplay = true, delay: delay2 = 0, driver = frameloopDriver, keyframes: keyframes$1, type = "keyframes", repeat = 0, repeatDelay = 0, repeatType = "loop", onPlay, onStop, onComplete, onUpdate, ...options }) {
  let speed = 1;
  let hasStopped = false;
  let resolveFinishedPromise;
  let currentFinishedPromise;
  const updateFinishedPromise = () => {
    currentFinishedPromise = new Promise((resolve) => {
      resolveFinishedPromise = resolve;
    });
  };
  updateFinishedPromise();
  let animationDriver;
  const generatorFactory = types[type] || keyframes2;
  let mapNumbersToKeyframes;
  if (generatorFactory !== keyframes2 && typeof keyframes$1[0] !== "number") {
    if (true) {
      invariant(keyframes$1.length === 2, `Only two keyframes currently supported with spring and inertia animations. Trying to animate ${keyframes$1}`);
    }
    mapNumbersToKeyframes = pipe3(percentToProgress, mix2(keyframes$1[0], keyframes$1[1]));
    keyframes$1 = [0, 100];
  }
  const generator = generatorFactory({ ...options, keyframes: keyframes$1 });
  let mirroredGenerator;
  if (repeatType === "mirror") {
    mirroredGenerator = generatorFactory({
      ...options,
      keyframes: [...keyframes$1].reverse(),
      velocity: -(options.velocity || 0)
    });
  }
  let playState = "idle";
  let holdTime = null;
  let startTime = null;
  let cancelTime = null;
  if (generator.calculatedDuration === null && repeat) {
    generator.calculatedDuration = calcGeneratorDuration(generator);
  }
  const { calculatedDuration } = generator;
  let resolvedDuration = Infinity;
  let totalDuration = Infinity;
  if (calculatedDuration !== null) {
    resolvedDuration = calculatedDuration + repeatDelay;
    totalDuration = resolvedDuration * (repeat + 1) - repeatDelay;
  }
  let currentTime = 0;
  const tick = (timestamp) => {
    if (startTime === null)
      return;
    if (speed > 0)
      startTime = Math.min(startTime, timestamp);
    if (speed < 0)
      startTime = Math.min(timestamp - totalDuration / speed, startTime);
    if (holdTime !== null) {
      currentTime = holdTime;
    } else {
      currentTime = Math.round(timestamp - startTime) * speed;
    }
    const timeWithoutDelay = currentTime - delay2 * (speed >= 0 ? 1 : -1);
    const isInDelayPhase = speed >= 0 ? timeWithoutDelay < 0 : timeWithoutDelay > totalDuration;
    currentTime = Math.max(timeWithoutDelay, 0);
    if (playState === "finished" && holdTime === null) {
      currentTime = totalDuration;
    }
    let elapsed = currentTime;
    let frameGenerator = generator;
    if (repeat) {
      const progress2 = Math.min(currentTime, totalDuration) / resolvedDuration;
      let currentIteration = Math.floor(progress2);
      let iterationProgress = progress2 % 1;
      if (!iterationProgress && progress2 >= 1) {
        iterationProgress = 1;
      }
      iterationProgress === 1 && currentIteration--;
      currentIteration = Math.min(currentIteration, repeat + 1);
      const isOddIteration = Boolean(currentIteration % 2);
      if (isOddIteration) {
        if (repeatType === "reverse") {
          iterationProgress = 1 - iterationProgress;
          if (repeatDelay) {
            iterationProgress -= repeatDelay / resolvedDuration;
          }
        } else if (repeatType === "mirror") {
          frameGenerator = mirroredGenerator;
        }
      }
      elapsed = clamp(0, 1, iterationProgress) * resolvedDuration;
    }
    const state2 = isInDelayPhase ? { done: false, value: keyframes$1[0] } : frameGenerator.next(elapsed);
    if (mapNumbersToKeyframes) {
      state2.value = mapNumbersToKeyframes(state2.value);
    }
    let { done } = state2;
    if (!isInDelayPhase && calculatedDuration !== null) {
      done = speed >= 0 ? currentTime >= totalDuration : currentTime <= 0;
    }
    const isAnimationFinished = holdTime === null && (playState === "finished" || playState === "running" && done);
    if (onUpdate) {
      onUpdate(state2.value);
    }
    if (isAnimationFinished) {
      finish();
    }
    return state2;
  };
  const stopAnimationDriver = () => {
    animationDriver && animationDriver.stop();
    animationDriver = void 0;
  };
  const cancel = () => {
    playState = "idle";
    stopAnimationDriver();
    resolveFinishedPromise();
    updateFinishedPromise();
    startTime = cancelTime = null;
  };
  const finish = () => {
    playState = "finished";
    onComplete && onComplete();
    stopAnimationDriver();
    resolveFinishedPromise();
  };
  const play = () => {
    if (hasStopped)
      return;
    if (!animationDriver)
      animationDriver = driver(tick);
    const now2 = animationDriver.now();
    onPlay && onPlay();
    if (holdTime !== null) {
      startTime = now2 - holdTime;
    } else if (!startTime || playState === "finished") {
      startTime = now2;
    }
    if (playState === "finished") {
      updateFinishedPromise();
    }
    cancelTime = startTime;
    holdTime = null;
    playState = "running";
    animationDriver.start();
  };
  if (autoplay) {
    play();
  }
  const controls = {
    then(resolve, reject) {
      return currentFinishedPromise.then(resolve, reject);
    },
    get time() {
      return millisecondsToSeconds(currentTime);
    },
    set time(newTime) {
      newTime = secondsToMilliseconds(newTime);
      currentTime = newTime;
      if (holdTime !== null || !animationDriver || speed === 0) {
        holdTime = newTime;
      } else {
        startTime = animationDriver.now() - newTime / speed;
      }
    },
    get duration() {
      const duration = generator.calculatedDuration === null ? calcGeneratorDuration(generator) : generator.calculatedDuration;
      return millisecondsToSeconds(duration);
    },
    get speed() {
      return speed;
    },
    set speed(newSpeed) {
      if (newSpeed === speed || !animationDriver)
        return;
      speed = newSpeed;
      controls.time = millisecondsToSeconds(currentTime);
    },
    get state() {
      return playState;
    },
    play,
    pause: () => {
      playState = "paused";
      holdTime = currentTime;
    },
    stop: () => {
      hasStopped = true;
      if (playState === "idle")
        return;
      playState = "idle";
      onStop && onStop();
      cancel();
    },
    cancel: () => {
      if (cancelTime !== null)
        tick(cancelTime);
      cancel();
    },
    complete: () => {
      playState = "finished";
    },
    sample: (elapsed) => {
      startTime = 0;
      return tick(elapsed);
    }
  };
  return controls;
}

// node_modules/framer-motion/dist/es/utils/memo.mjs
function memo(callback) {
  let result;
  return () => {
    if (result === void 0)
      result = callback();
    return result;
  };
}

// node_modules/framer-motion/dist/es/animation/animators/waapi/create-accelerated-animation.mjs
var supportsWaapi = memo(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
var acceleratedValues = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
]);
var sampleDelta = 10;
var maxDuration2 = 2e4;
var requiresPregeneratedKeyframes = (valueName, options) => options.type === "spring" || valueName === "backgroundColor" || !isWaapiSupportedEasing(options.ease);
function createAcceleratedAnimation(value, valueName, { onUpdate, onComplete, ...options }) {
  const canAccelerateAnimation = supportsWaapi() && acceleratedValues.has(valueName) && !options.repeatDelay && options.repeatType !== "mirror" && options.damping !== 0 && options.type !== "inertia";
  if (!canAccelerateAnimation)
    return false;
  let hasStopped = false;
  let resolveFinishedPromise;
  let currentFinishedPromise;
  let pendingCancel = false;
  const updateFinishedPromise = () => {
    currentFinishedPromise = new Promise((resolve) => {
      resolveFinishedPromise = resolve;
    });
  };
  updateFinishedPromise();
  let { keyframes: keyframes3, duration = 300, ease: ease2, times } = options;
  if (requiresPregeneratedKeyframes(valueName, options)) {
    const sampleAnimation = animateValue({
      ...options,
      repeat: 0,
      delay: 0
    });
    let state2 = { done: false, value: keyframes3[0] };
    const pregeneratedKeyframes = [];
    let t2 = 0;
    while (!state2.done && t2 < maxDuration2) {
      state2 = sampleAnimation.sample(t2);
      pregeneratedKeyframes.push(state2.value);
      t2 += sampleDelta;
    }
    times = void 0;
    keyframes3 = pregeneratedKeyframes;
    duration = t2 - sampleDelta;
    ease2 = "linear";
  }
  const animation = animateStyle(value.owner.current, valueName, keyframes3, {
    ...options,
    duration,
    /**
     * This function is currently not called if ease is provided
     * as a function so the cast is safe.
     *
     * However it would be possible for a future refinement to port
     * in easing pregeneration from Motion One for browsers that
     * support the upcoming `linear()` easing function.
     */
    ease: ease2,
    times
  });
  const cancelAnimation = () => {
    pendingCancel = false;
    animation.cancel();
  };
  const safeCancel = () => {
    pendingCancel = true;
    frame.update(cancelAnimation);
    resolveFinishedPromise();
    updateFinishedPromise();
  };
  animation.onfinish = () => {
    if (pendingCancel)
      return;
    value.set(getFinalKeyframe(keyframes3, options));
    onComplete && onComplete();
    safeCancel();
  };
  const controls = {
    then(resolve, reject) {
      return currentFinishedPromise.then(resolve, reject);
    },
    attachTimeline(timeline) {
      animation.timeline = timeline;
      animation.onfinish = null;
      return noop3;
    },
    get time() {
      return millisecondsToSeconds(animation.currentTime || 0);
    },
    set time(newTime) {
      animation.currentTime = secondsToMilliseconds(newTime);
    },
    get speed() {
      return animation.playbackRate;
    },
    set speed(newSpeed) {
      animation.playbackRate = newSpeed;
    },
    get duration() {
      return millisecondsToSeconds(duration);
    },
    play: () => {
      if (hasStopped)
        return;
      animation.play();
      cancelFrame(cancelAnimation);
    },
    pause: () => animation.pause(),
    stop: () => {
      hasStopped = true;
      if (animation.playState === "idle")
        return;
      const { currentTime } = animation;
      if (currentTime) {
        const sampleAnimation = animateValue({
          ...options,
          autoplay: false
        });
        value.setWithVelocity(sampleAnimation.sample(currentTime - sampleDelta).value, sampleAnimation.sample(currentTime).value, sampleDelta);
      }
      safeCancel();
    },
    complete: () => {
      if (pendingCancel)
        return;
      animation.finish();
    },
    cancel: safeCancel
  };
  return controls;
}

// node_modules/framer-motion/dist/es/animation/animators/instant.mjs
function createInstantAnimation({ keyframes: keyframes3, delay: delay2, onUpdate, onComplete }) {
  const setValue = () => {
    onUpdate && onUpdate(keyframes3[keyframes3.length - 1]);
    onComplete && onComplete();
    return {
      time: 0,
      speed: 1,
      duration: 0,
      play: noop3,
      pause: noop3,
      stop: noop3,
      then: (resolve) => {
        resolve();
        return Promise.resolve();
      },
      cancel: noop3,
      complete: noop3
    };
  };
  return delay2 ? animateValue({
    keyframes: [0, 1],
    duration: 0,
    delay: delay2,
    onComplete: setValue
  }) : setValue();
}

// node_modules/framer-motion/dist/es/animation/utils/default-transitions.mjs
var underDampedSpring = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
};
var criticallyDampedSpring = (target) => ({
  type: "spring",
  stiffness: 550,
  damping: target === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
});
var keyframesTransition = {
  type: "keyframes",
  duration: 0.8
};
var ease = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
};
var getDefaultTransition = (valueKey, { keyframes: keyframes3 }) => {
  if (keyframes3.length > 2) {
    return keyframesTransition;
  } else if (transformProps.has(valueKey)) {
    return valueKey.startsWith("scale") ? criticallyDampedSpring(keyframes3[1]) : underDampedSpring;
  }
  return ease;
};

// node_modules/framer-motion/dist/es/animation/utils/is-animatable.mjs
var isAnimatable = (key, value) => {
  if (key === "zIndex")
    return false;
  if (typeof value === "number" || Array.isArray(value))
    return true;
  if (typeof value === "string" && // It's animatable if we have a string
  (complex.test(value) || value === "0") && // And it contains numbers and/or colors
  !value.startsWith("url(")) {
    return true;
  }
  return false;
};

// node_modules/framer-motion/dist/es/value/types/complex/filter.mjs
var maxDefaults = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function applyDefaultFilter(v) {
  const [name, value] = v.slice(0, -1).split("(");
  if (name === "drop-shadow")
    return v;
  const [number2] = value.match(floatRegex) || [];
  if (!number2)
    return v;
  const unit = value.replace(number2, "");
  let defaultValue = maxDefaults.has(name) ? 1 : 0;
  if (number2 !== value)
    defaultValue *= 100;
  return name + "(" + defaultValue + unit + ")";
}
var functionRegex = /([a-z-]*)\(.*?\)/g;
var filter2 = {
  ...complex,
  getAnimatableNone: (v) => {
    const functions = v.match(functionRegex);
    return functions ? functions.map(applyDefaultFilter).join(" ") : v;
  }
};

// node_modules/framer-motion/dist/es/render/dom/value-types/defaults.mjs
var defaultValueTypes = {
  ...numberValueTypes,
  // Color props
  color: color2,
  backgroundColor: color2,
  outlineColor: color2,
  fill: color2,
  stroke: color2,
  // Border props
  borderColor: color2,
  borderTopColor: color2,
  borderRightColor: color2,
  borderBottomColor: color2,
  borderLeftColor: color2,
  filter: filter2,
  WebkitFilter: filter2
};
var getDefaultValueType = (key) => defaultValueTypes[key];

// node_modules/framer-motion/dist/es/render/dom/value-types/animatable-none.mjs
function getAnimatableNone2(key, value) {
  let defaultValueType = getDefaultValueType(key);
  if (defaultValueType !== filter2)
    defaultValueType = complex;
  return defaultValueType.getAnimatableNone ? defaultValueType.getAnimatableNone(value) : void 0;
}

// node_modules/framer-motion/dist/es/utils/is-zero-value-string.mjs
var isZeroValueString = (v) => /^0[^.\s]+$/.test(v);

// node_modules/framer-motion/dist/es/animation/utils/is-none.mjs
function isNone(value) {
  if (typeof value === "number") {
    return value === 0;
  } else if (value !== null) {
    return value === "none" || value === "0" || isZeroValueString(value);
  }
}

// node_modules/framer-motion/dist/es/animation/utils/keyframes.mjs
function getKeyframes(value, valueName, target, transition3) {
  const isTargetAnimatable = isAnimatable(valueName, target);
  let keyframes3;
  if (Array.isArray(target)) {
    keyframes3 = [...target];
  } else {
    keyframes3 = [null, target];
  }
  const defaultOrigin = transition3.from !== void 0 ? transition3.from : value.get();
  let animatableTemplateValue = void 0;
  const noneKeyframeIndexes = [];
  for (let i = 0; i < keyframes3.length; i++) {
    if (keyframes3[i] === null) {
      keyframes3[i] = i === 0 ? defaultOrigin : keyframes3[i - 1];
    }
    if (isNone(keyframes3[i])) {
      noneKeyframeIndexes.push(i);
    }
    if (typeof keyframes3[i] === "string" && keyframes3[i] !== "none" && keyframes3[i] !== "0") {
      animatableTemplateValue = keyframes3[i];
    }
  }
  if (isTargetAnimatable && noneKeyframeIndexes.length && animatableTemplateValue) {
    for (let i = 0; i < noneKeyframeIndexes.length; i++) {
      const index2 = noneKeyframeIndexes[i];
      keyframes3[index2] = getAnimatableNone2(valueName, animatableTemplateValue);
    }
  }
  return keyframes3;
}

// node_modules/framer-motion/dist/es/animation/utils/transitions.mjs
function isTransitionDefined({ when, delay: _delay, delayChildren, staggerChildren, staggerDirection, repeat, repeatType, repeatDelay, from, elapsed, ...transition3 }) {
  return !!Object.keys(transition3).length;
}
function getValueTransition(transition3, key) {
  return transition3[key] || transition3["default"] || transition3;
}

// node_modules/framer-motion/dist/es/animation/interfaces/motion-value.mjs
var animateMotionValue = (valueName, value, target, transition3 = {}) => {
  return (onComplete) => {
    const valueTransition = getValueTransition(transition3, valueName) || {};
    const delay2 = valueTransition.delay || transition3.delay || 0;
    let { elapsed = 0 } = transition3;
    elapsed = elapsed - secondsToMilliseconds(delay2);
    const keyframes3 = getKeyframes(value, valueName, target, valueTransition);
    const originKeyframe = keyframes3[0];
    const targetKeyframe = keyframes3[keyframes3.length - 1];
    const isOriginAnimatable = isAnimatable(valueName, originKeyframe);
    const isTargetAnimatable = isAnimatable(valueName, targetKeyframe);
    warning(isOriginAnimatable === isTargetAnimatable, `You are trying to animate ${valueName} from "${originKeyframe}" to "${targetKeyframe}". ${originKeyframe} is not an animatable value - to enable this animation set ${originKeyframe} to a value animatable to ${targetKeyframe} via the \`style\` property.`);
    let options = {
      keyframes: keyframes3,
      velocity: value.getVelocity(),
      ease: "easeOut",
      ...valueTransition,
      delay: -elapsed,
      onUpdate: (v) => {
        value.set(v);
        valueTransition.onUpdate && valueTransition.onUpdate(v);
      },
      onComplete: () => {
        onComplete();
        valueTransition.onComplete && valueTransition.onComplete();
      }
    };
    if (!isTransitionDefined(valueTransition)) {
      options = {
        ...options,
        ...getDefaultTransition(valueName, options)
      };
    }
    if (options.duration) {
      options.duration = secondsToMilliseconds(options.duration);
    }
    if (options.repeatDelay) {
      options.repeatDelay = secondsToMilliseconds(options.repeatDelay);
    }
    if (!isOriginAnimatable || !isTargetAnimatable || instantAnimationState.current || valueTransition.type === false || MotionGlobalConfig.skipAnimations) {
      return createInstantAnimation(instantAnimationState.current ? { ...options, delay: 0 } : options);
    }
    if (
      /**
       * If this is a handoff animation, the optimised animation will be running via
       * WAAPI. Therefore, this animation must be JS to ensure it runs "under" the
       * optimised animation.
       */
      !transition3.isHandoff && value.owner && value.owner.current instanceof HTMLElement && /**
       * If we're outputting values to onUpdate then we can't use WAAPI as there's
       * no way to read the value from WAAPI every frame.
       */
      !value.owner.getProps().onUpdate
    ) {
      const acceleratedAnimation = createAcceleratedAnimation(value, valueName, options);
      if (acceleratedAnimation)
        return acceleratedAnimation;
    }
    return animateValue(options);
  };
};

// node_modules/framer-motion/dist/es/value/use-will-change/is.mjs
function isWillChangeMotionValue(value) {
  return Boolean(isMotionValue(value) && value.add);
}

// node_modules/framer-motion/dist/es/utils/is-numerical-string.mjs
var isNumericalString = (v) => /^\-?\d*\.?\d+$/.test(v);

// node_modules/framer-motion/dist/es/utils/array.mjs
function addUniqueItem(arr, item) {
  if (arr.indexOf(item) === -1)
    arr.push(item);
}
function removeItem(arr, item) {
  const index2 = arr.indexOf(item);
  if (index2 > -1)
    arr.splice(index2, 1);
}

// node_modules/framer-motion/dist/es/utils/subscription-manager.mjs
var SubscriptionManager = class {
  constructor() {
    this.subscriptions = [];
  }
  add(handler) {
    addUniqueItem(this.subscriptions, handler);
    return () => removeItem(this.subscriptions, handler);
  }
  notify(a, b, c) {
    const numSubscriptions = this.subscriptions.length;
    if (!numSubscriptions)
      return;
    if (numSubscriptions === 1) {
      this.subscriptions[0](a, b, c);
    } else {
      for (let i = 0; i < numSubscriptions; i++) {
        const handler = this.subscriptions[i];
        handler && handler(a, b, c);
      }
    }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
};

// node_modules/framer-motion/dist/es/utils/warn-once.mjs
var warned = /* @__PURE__ */ new Set();
function warnOnce(condition, message, element) {
  if (condition || warned.has(message))
    return;
  console.warn(message);
  if (element)
    console.warn(element);
  warned.add(message);
}

// node_modules/framer-motion/dist/es/value/index.mjs
var MAX_VELOCITY_DELTA = 30;
var isFloat = (value) => {
  return !isNaN(parseFloat(value));
};
var collectMotionValues = {
  current: void 0
};
var MotionValue = class {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   *
   * @internal
   */
  constructor(init, options = {}) {
    this.version = "11.0.8";
    this.canTrackVelocity = false;
    this.events = {};
    this.updateAndNotify = (v, render = true) => {
      const currentTime = time.now();
      if (this.updatedAt !== currentTime) {
        this.setPrevFrameValue();
      }
      this.prev = this.current;
      this.setCurrent(v);
      if (this.current !== this.prev && this.events.change) {
        this.events.change.notify(this.current);
      }
      if (render && this.events.renderRequest) {
        this.events.renderRequest.notify(this.current);
      }
    };
    this.hasAnimated = false;
    this.setCurrent(init);
    this.canTrackVelocity = isFloat(this.current);
    this.owner = options.owner;
  }
  setCurrent(current) {
    this.current = current;
    this.updatedAt = time.now();
  }
  setPrevFrameValue(prevFrameValue = this.current) {
    this.prevFrameValue = prevFrameValue;
    this.prevUpdatedAt = this.updatedAt;
  }
  /**
   * Adds a function that will be notified when the `MotionValue` is updated.
   *
   * It returns a function that, when called, will cancel the subscription.
   *
   * When calling `onChange` inside a React component, it should be wrapped with the
   * `useEffect` hook. As it returns an unsubscribe function, this should be returned
   * from the `useEffect` function to ensure you don't add duplicate subscribers..
   *
   * ```jsx
   * export const MyComponent = () => {
   *   const x = useMotionValue(0)
   *   const y = useMotionValue(0)
   *   const opacity = useMotionValue(1)
   *
   *   useEffect(() => {
   *     function updateOpacity() {
   *       const maxXY = Math.max(x.get(), y.get())
   *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
   *       opacity.set(newOpacity)
   *     }
   *
   *     const unsubscribeX = x.on("change", updateOpacity)
   *     const unsubscribeY = y.on("change", updateOpacity)
   *
   *     return () => {
   *       unsubscribeX()
   *       unsubscribeY()
   *     }
   *   }, [])
   *
   *   return <motion.div style={{ x }} />
   * }
   * ```
   *
   * @param subscriber - A function that receives the latest value.
   * @returns A function that, when called, will cancel this subscription.
   *
   * @deprecated
   */
  onChange(subscription) {
    if (true) {
      warnOnce(false, `value.onChange(callback) is deprecated. Switch to value.on("change", callback).`);
    }
    return this.on("change", subscription);
  }
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = new SubscriptionManager();
    }
    const unsubscribe = this.events[eventName].add(callback);
    if (eventName === "change") {
      return () => {
        unsubscribe();
        frame.read(() => {
          if (!this.events.change.getSize()) {
            this.stop();
          }
        });
      };
    }
    return unsubscribe;
  }
  clearListeners() {
    for (const eventManagers in this.events) {
      this.events[eventManagers].clear();
    }
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   *
   * @internal
   */
  attach(passiveEffect, stopPassiveEffect) {
    this.passiveEffect = passiveEffect;
    this.stopPassiveEffect = stopPassiveEffect;
  }
  /**
   * Sets the state of the `MotionValue`.
   *
   * @remarks
   *
   * ```jsx
   * const x = useMotionValue(0)
   * x.set(10)
   * ```
   *
   * @param latest - Latest value to set.
   * @param render - Whether to notify render subscribers. Defaults to `true`
   *
   * @public
   */
  set(v, render = true) {
    if (!render || !this.passiveEffect) {
      this.updateAndNotify(v, render);
    } else {
      this.passiveEffect(v, this.updateAndNotify);
    }
  }
  setWithVelocity(prev, current, delta) {
    this.set(current);
    this.prev = void 0;
    this.prevFrameValue = prev;
    this.prevUpdatedAt = this.updatedAt - delta;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(v) {
    this.updateAndNotify(v);
    this.prev = v;
    this.prevUpdatedAt = this.prevFrameValue = void 0;
    this.stop();
    if (this.stopPassiveEffect)
      this.stopPassiveEffect();
  }
  /**
   * Returns the latest state of `MotionValue`
   *
   * @returns - The latest state of `MotionValue`
   *
   * @public
   */
  get() {
    if (collectMotionValues.current) {
      collectMotionValues.current.push(this);
    }
    return this.current;
  }
  /**
   * @public
   */
  getPrevious() {
    return this.prev;
  }
  /**
   * Returns the latest velocity of `MotionValue`
   *
   * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
   *
   * @public
   */
  getVelocity() {
    const currentTime = time.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || currentTime - this.updatedAt > MAX_VELOCITY_DELTA) {
      return 0;
    }
    const delta = Math.min(this.updatedAt - this.prevUpdatedAt, MAX_VELOCITY_DELTA);
    return velocityPerSecond(parseFloat(this.current) - parseFloat(this.prevFrameValue), delta);
  }
  /**
   * Registers a new animation to control this `MotionValue`. Only one
   * animation can drive a `MotionValue` at one time.
   *
   * ```jsx
   * value.start()
   * ```
   *
   * @param animation - A function that starts the provided animation
   *
   * @internal
   */
  start(startAnimation) {
    this.stop();
    return new Promise((resolve) => {
      this.hasAnimated = true;
      this.animation = startAnimation(resolve);
      if (this.events.animationStart) {
        this.events.animationStart.notify();
      }
    }).then(() => {
      if (this.events.animationComplete) {
        this.events.animationComplete.notify();
      }
      this.clearAnimation();
    });
  }
  /**
   * Stop the currently active animation.
   *
   * @public
   */
  stop() {
    if (this.animation) {
      this.animation.stop();
      if (this.events.animationCancel) {
        this.events.animationCancel.notify();
      }
    }
    this.clearAnimation();
  }
  /**
   * Returns `true` if this value is currently animating.
   *
   * @public
   */
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  /**
   * Destroy and clean up subscribers to this `MotionValue`.
   *
   * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
   * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
   * created a `MotionValue` via the `motionValue` function.
   *
   * @public
   */
  destroy() {
    this.clearListeners();
    this.stop();
    if (this.stopPassiveEffect) {
      this.stopPassiveEffect();
    }
  }
};
function motionValue(init, options) {
  return new MotionValue(init, options);
}

// node_modules/framer-motion/dist/es/render/dom/value-types/test.mjs
var testValueType = (v) => (type) => type.test(v);

// node_modules/framer-motion/dist/es/render/dom/value-types/type-auto.mjs
var auto = {
  test: (v) => v === "auto",
  parse: (v) => v
};

// node_modules/framer-motion/dist/es/render/dom/value-types/dimensions.mjs
var dimensionValueTypes = [number, px2, percent, degrees, vw, vh, auto];
var findDimensionValueType = (v) => dimensionValueTypes.find(testValueType(v));

// node_modules/framer-motion/dist/es/render/dom/value-types/find.mjs
var valueTypes = [...dimensionValueTypes, color2, complex];
var findValueType = (v) => valueTypes.find(testValueType(v));

// node_modules/framer-motion/dist/es/render/utils/setters.mjs
function setMotionValue(visualElement, key, value) {
  if (visualElement.hasValue(key)) {
    visualElement.getValue(key).set(value);
  } else {
    visualElement.addValue(key, motionValue(value));
  }
}
function setTarget(visualElement, definition) {
  const resolved = resolveVariant(visualElement, definition);
  let { transitionEnd = {}, transition: transition3 = {}, ...target } = resolved ? visualElement.makeTargetAnimatable(resolved, false) : {};
  target = { ...target, ...transitionEnd };
  for (const key in target) {
    const value = resolveFinalValueInKeyframes(target[key]);
    setMotionValue(visualElement, key, value);
  }
}
function checkTargetForNewValues(visualElement, target, origin) {
  var _a7, _b5;
  const newValueKeys = Object.keys(target).filter((key) => !visualElement.hasValue(key));
  const numNewValues = newValueKeys.length;
  if (!numNewValues)
    return;
  for (let i = 0; i < numNewValues; i++) {
    const key = newValueKeys[i];
    const targetValue = target[key];
    let value = null;
    if (Array.isArray(targetValue)) {
      value = targetValue[0];
    }
    if (value === null) {
      value = (_b5 = (_a7 = origin[key]) !== null && _a7 !== void 0 ? _a7 : visualElement.readValue(key)) !== null && _b5 !== void 0 ? _b5 : target[key];
    }
    if (value === void 0 || value === null)
      continue;
    if (typeof value === "string" && (isNumericalString(value) || isZeroValueString(value))) {
      value = parseFloat(value);
    } else if (!findValueType(value) && complex.test(targetValue)) {
      value = getAnimatableNone2(key, targetValue);
    }
    visualElement.addValue(key, motionValue(value, { owner: visualElement }));
    if (origin[key] === void 0) {
      origin[key] = value;
    }
    if (value !== null)
      visualElement.setBaseTarget(key, value);
  }
}
function getOriginFromTransition(key, transition3) {
  if (!transition3)
    return;
  const valueTransition = transition3[key] || transition3["default"] || transition3;
  return valueTransition.from;
}
function getOrigin(target, transition3, visualElement) {
  const origin = {};
  for (const key in target) {
    const transitionOrigin = getOriginFromTransition(key, transition3);
    if (transitionOrigin !== void 0) {
      origin[key] = transitionOrigin;
    } else {
      const value = visualElement.getValue(key);
      if (value) {
        origin[key] = value.get();
      }
    }
  }
  return origin;
}

// node_modules/framer-motion/dist/es/animation/interfaces/visual-element-target.mjs
function shouldBlockAnimation({ protectedKeys, needsAnimating }, key) {
  const shouldBlock = protectedKeys.hasOwnProperty(key) && needsAnimating[key] !== true;
  needsAnimating[key] = false;
  return shouldBlock;
}
function hasKeyframesChanged(value, target) {
  const current = value.get();
  if (Array.isArray(target)) {
    for (let i = 0; i < target.length; i++) {
      if (target[i] !== current)
        return true;
    }
  } else {
    return current !== target;
  }
}
function animateTarget(visualElement, definition, { delay: delay2 = 0, transitionOverride, type } = {}) {
  let { transition: transition3 = visualElement.getDefaultTransition(), transitionEnd, ...target } = visualElement.makeTargetAnimatable(definition);
  const willChange = visualElement.getValue("willChange");
  if (transitionOverride)
    transition3 = transitionOverride;
  const animations2 = [];
  const animationTypeState = type && visualElement.animationState && visualElement.animationState.getState()[type];
  for (const key in target) {
    const value = visualElement.getValue(key);
    const valueTarget = target[key];
    if (!value || valueTarget === void 0 || animationTypeState && shouldBlockAnimation(animationTypeState, key)) {
      continue;
    }
    const valueTransition = {
      delay: delay2,
      elapsed: 0,
      ...getValueTransition(transition3 || {}, key)
    };
    if (window.HandoffAppearAnimations) {
      const appearId = visualElement.getProps()[optimizedAppearDataAttribute];
      if (appearId) {
        const elapsed = window.HandoffAppearAnimations(appearId, key, value, frame);
        if (elapsed !== null) {
          valueTransition.elapsed = elapsed;
          valueTransition.isHandoff = true;
        }
      }
    }
    let canSkip = !valueTransition.isHandoff && !hasKeyframesChanged(value, valueTarget);
    if (valueTransition.type === "spring" && (value.getVelocity() || valueTransition.velocity)) {
      canSkip = false;
    }
    if (value.animation) {
      canSkip = false;
    }
    if (canSkip)
      continue;
    value.start(animateMotionValue(key, value, valueTarget, visualElement.shouldReduceMotion && transformProps.has(key) ? { type: false } : valueTransition));
    const animation = value.animation;
    if (isWillChangeMotionValue(willChange)) {
      willChange.add(key);
      animation.then(() => willChange.remove(key));
    }
    animations2.push(animation);
  }
  if (transitionEnd) {
    Promise.all(animations2).then(() => {
      transitionEnd && setTarget(visualElement, transitionEnd);
    });
  }
  return animations2;
}

// node_modules/framer-motion/dist/es/animation/interfaces/visual-element-variant.mjs
function animateVariant(visualElement, variant, options = {}) {
  const resolved = resolveVariant(visualElement, variant, options.custom);
  let { transition: transition3 = visualElement.getDefaultTransition() || {} } = resolved || {};
  if (options.transitionOverride) {
    transition3 = options.transitionOverride;
  }
  const getAnimation = resolved ? () => Promise.all(animateTarget(visualElement, resolved, options)) : () => Promise.resolve();
  const getChildAnimations = visualElement.variantChildren && visualElement.variantChildren.size ? (forwardDelay = 0) => {
    const { delayChildren = 0, staggerChildren, staggerDirection } = transition3;
    return animateChildren(visualElement, variant, delayChildren + forwardDelay, staggerChildren, staggerDirection, options);
  } : () => Promise.resolve();
  const { when } = transition3;
  if (when) {
    const [first, last] = when === "beforeChildren" ? [getAnimation, getChildAnimations] : [getChildAnimations, getAnimation];
    return first().then(() => last());
  } else {
    return Promise.all([getAnimation(), getChildAnimations(options.delay)]);
  }
}
function animateChildren(visualElement, variant, delayChildren = 0, staggerChildren = 0, staggerDirection = 1, options) {
  const animations2 = [];
  const maxStaggerDuration = (visualElement.variantChildren.size - 1) * staggerChildren;
  const generateStaggerDuration = staggerDirection === 1 ? (i = 0) => i * staggerChildren : (i = 0) => maxStaggerDuration - i * staggerChildren;
  Array.from(visualElement.variantChildren).sort(sortByTreeOrder).forEach((child, i) => {
    child.notify("AnimationStart", variant);
    animations2.push(animateVariant(child, variant, {
      ...options,
      delay: delayChildren + generateStaggerDuration(i)
    }).then(() => child.notify("AnimationComplete", variant)));
  });
  return Promise.all(animations2);
}
function sortByTreeOrder(a, b) {
  return a.sortNodePosition(b);
}

// node_modules/framer-motion/dist/es/animation/interfaces/visual-element.mjs
function animateVisualElement(visualElement, definition, options = {}) {
  visualElement.notify("AnimationStart", definition);
  let animation;
  if (Array.isArray(definition)) {
    const animations2 = definition.map((variant) => animateVariant(visualElement, variant, options));
    animation = Promise.all(animations2);
  } else if (typeof definition === "string") {
    animation = animateVariant(visualElement, definition, options);
  } else {
    const resolvedDefinition = typeof definition === "function" ? resolveVariant(visualElement, definition, options.custom) : definition;
    animation = Promise.all(animateTarget(visualElement, resolvedDefinition, options));
  }
  return animation.then(() => visualElement.notify("AnimationComplete", definition));
}

// node_modules/framer-motion/dist/es/render/utils/animation-state.mjs
var reversePriorityOrder = [...variantPriorityOrder].reverse();
var numAnimationTypes = variantPriorityOrder.length;
function animateList(visualElement) {
  return (animations2) => Promise.all(animations2.map(({ animation, options }) => animateVisualElement(visualElement, animation, options)));
}
function createAnimationState(visualElement) {
  let animate = animateList(visualElement);
  const state2 = createState();
  let isInitialRender = true;
  const buildResolvedTypeValues = (acc, definition) => {
    const resolved = resolveVariant(visualElement, definition);
    if (resolved) {
      const { transition: transition3, transitionEnd, ...target } = resolved;
      acc = { ...acc, ...target, ...transitionEnd };
    }
    return acc;
  };
  function setAnimateFunction(makeAnimator) {
    animate = makeAnimator(visualElement);
  }
  function animateChanges(options, changedActiveType) {
    const props = visualElement.getProps();
    const context = visualElement.getVariantContext(true) || {};
    const animations2 = [];
    const removedKeys = /* @__PURE__ */ new Set();
    let encounteredKeys = {};
    let removedVariantIndex = Infinity;
    for (let i = 0; i < numAnimationTypes; i++) {
      const type = reversePriorityOrder[i];
      const typeState = state2[type];
      const prop = props[type] !== void 0 ? props[type] : context[type];
      const propIsVariant = isVariantLabel(prop);
      const activeDelta = type === changedActiveType ? typeState.isActive : null;
      if (activeDelta === false)
        removedVariantIndex = i;
      let isInherited = prop === context[type] && prop !== props[type] && propIsVariant;
      if (isInherited && isInitialRender && visualElement.manuallyAnimateOnMount) {
        isInherited = false;
      }
      typeState.protectedKeys = { ...encounteredKeys };
      if (
        // If it isn't active and hasn't *just* been set as inactive
        !typeState.isActive && activeDelta === null || // If we didn't and don't have any defined prop for this animation type
        !prop && !typeState.prevProp || // Or if the prop doesn't define an animation
        isAnimationControls(prop) || typeof prop === "boolean"
      ) {
        continue;
      }
      const variantDidChange = checkVariantsDidChange(typeState.prevProp, prop);
      let shouldAnimateType = variantDidChange || // If we're making this variant active, we want to always make it active
      type === changedActiveType && typeState.isActive && !isInherited && propIsVariant || // If we removed a higher-priority variant (i is in reverse order)
      i > removedVariantIndex && propIsVariant;
      let handledRemovedValues = false;
      const definitionList = Array.isArray(prop) ? prop : [prop];
      let resolvedValues = definitionList.reduce(buildResolvedTypeValues, {});
      if (activeDelta === false)
        resolvedValues = {};
      const { prevResolvedValues = {} } = typeState;
      const allKeys = {
        ...prevResolvedValues,
        ...resolvedValues
      };
      const markToAnimate = (key) => {
        shouldAnimateType = true;
        if (removedKeys.has(key)) {
          handledRemovedValues = true;
          removedKeys.delete(key);
        }
        typeState.needsAnimating[key] = true;
      };
      for (const key in allKeys) {
        const next = resolvedValues[key];
        const prev = prevResolvedValues[key];
        if (encounteredKeys.hasOwnProperty(key))
          continue;
        let valueHasChanged = false;
        if (isKeyframesTarget(next) && isKeyframesTarget(prev)) {
          valueHasChanged = !shallowCompare(next, prev);
        } else {
          valueHasChanged = next !== prev;
        }
        if (valueHasChanged) {
          if (next !== void 0) {
            markToAnimate(key);
          } else {
            removedKeys.add(key);
          }
        } else if (next !== void 0 && removedKeys.has(key)) {
          markToAnimate(key);
        } else {
          typeState.protectedKeys[key] = true;
        }
      }
      typeState.prevProp = prop;
      typeState.prevResolvedValues = resolvedValues;
      if (typeState.isActive) {
        encounteredKeys = { ...encounteredKeys, ...resolvedValues };
      }
      if (isInitialRender && visualElement.blockInitialAnimation) {
        shouldAnimateType = false;
      }
      if (shouldAnimateType && (!isInherited || handledRemovedValues)) {
        animations2.push(...definitionList.map((animation) => ({
          animation,
          options: { type, ...options }
        })));
      }
    }
    if (removedKeys.size) {
      const fallbackAnimation = {};
      removedKeys.forEach((key) => {
        const fallbackTarget = visualElement.getBaseTarget(key);
        if (fallbackTarget !== void 0) {
          fallbackAnimation[key] = fallbackTarget;
        }
      });
      animations2.push({ animation: fallbackAnimation });
    }
    let shouldAnimate = Boolean(animations2.length);
    if (isInitialRender && (props.initial === false || props.initial === props.animate) && !visualElement.manuallyAnimateOnMount) {
      shouldAnimate = false;
    }
    isInitialRender = false;
    return shouldAnimate ? animate(animations2) : Promise.resolve();
  }
  function setActive(type, isActive, options) {
    var _a7;
    if (state2[type].isActive === isActive)
      return Promise.resolve();
    (_a7 = visualElement.variantChildren) === null || _a7 === void 0 ? void 0 : _a7.forEach((child) => {
      var _a8;
      return (_a8 = child.animationState) === null || _a8 === void 0 ? void 0 : _a8.setActive(type, isActive);
    });
    state2[type].isActive = isActive;
    const animations2 = animateChanges(options, type);
    for (const key in state2) {
      state2[key].protectedKeys = {};
    }
    return animations2;
  }
  return {
    animateChanges,
    setActive,
    setAnimateFunction,
    getState: () => state2
  };
}
function checkVariantsDidChange(prev, next) {
  if (typeof next === "string") {
    return next !== prev;
  } else if (Array.isArray(next)) {
    return !shallowCompare(next, prev);
  }
  return false;
}
function createTypeState(isActive = false) {
  return {
    isActive,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function createState() {
  return {
    animate: createTypeState(true),
    whileInView: createTypeState(),
    whileHover: createTypeState(),
    whileTap: createTypeState(),
    whileDrag: createTypeState(),
    whileFocus: createTypeState(),
    exit: createTypeState()
  };
}

// node_modules/framer-motion/dist/es/motion/features/animation/index.mjs
var AnimationFeature = class extends Feature {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(node) {
    super(node);
    node.animationState || (node.animationState = createAnimationState(node));
  }
  updateAnimationControlsSubscription() {
    const { animate } = this.node.getProps();
    this.unmount();
    if (isAnimationControls(animate)) {
      this.unmount = animate.subscribe(this.node);
    }
  }
  /**
   * Subscribe any provided AnimationControls to the component's VisualElement
   */
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate } = this.node.getProps();
    const { animate: prevAnimate } = this.node.prevProps || {};
    if (animate !== prevAnimate) {
      this.updateAnimationControlsSubscription();
    }
  }
  unmount() {
  }
};

// node_modules/framer-motion/dist/es/motion/features/animation/exit.mjs
var id = 0;
var ExitAnimationFeature = class extends Feature {
  constructor() {
    super(...arguments);
    this.id = id++;
  }
  update() {
    if (!this.node.presenceContext)
      return;
    const { isPresent: isPresent2, onExitComplete, custom } = this.node.presenceContext;
    const { isPresent: prevIsPresent } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || isPresent2 === prevIsPresent) {
      return;
    }
    const exitAnimation = this.node.animationState.setActive("exit", !isPresent2, { custom: custom !== null && custom !== void 0 ? custom : this.node.getProps().custom });
    if (onExitComplete && !isPresent2) {
      exitAnimation.then(() => onExitComplete(this.id));
    }
  }
  mount() {
    const { register } = this.node.presenceContext || {};
    if (register) {
      this.unmount = register(this.id);
    }
  }
  unmount() {
  }
};

// node_modules/framer-motion/dist/es/motion/features/animations.mjs
var animations = {
  animation: {
    Feature: AnimationFeature
  },
  exit: {
    Feature: ExitAnimationFeature
  }
};

// node_modules/framer-motion/dist/es/utils/distance.mjs
var distance2 = (a, b) => Math.abs(a - b);
function distance2D(a, b) {
  const xDelta = distance2(a.x, b.x);
  const yDelta = distance2(a.y, b.y);
  return Math.sqrt(xDelta ** 2 + yDelta ** 2);
}

// node_modules/framer-motion/dist/es/gestures/pan/PanSession.mjs
var PanSession = class {
  constructor(event, handlers, { transformPagePoint, contextWindow, dragSnapToOrigin = false } = {}) {
    this.startEvent = null;
    this.lastMoveEvent = null;
    this.lastMoveEventInfo = null;
    this.handlers = {};
    this.contextWindow = window;
    this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const info2 = getPanInfo(this.lastMoveEventInfo, this.history);
      const isPanStarted = this.startEvent !== null;
      const isDistancePastThreshold = distance2D(info2.offset, { x: 0, y: 0 }) >= 3;
      if (!isPanStarted && !isDistancePastThreshold)
        return;
      const { point: point2 } = info2;
      const { timestamp: timestamp2 } = frameData;
      this.history.push({ ...point2, timestamp: timestamp2 });
      const { onStart, onMove } = this.handlers;
      if (!isPanStarted) {
        onStart && onStart(this.lastMoveEvent, info2);
        this.startEvent = this.lastMoveEvent;
      }
      onMove && onMove(this.lastMoveEvent, info2);
    };
    this.handlePointerMove = (event2, info2) => {
      this.lastMoveEvent = event2;
      this.lastMoveEventInfo = transformPoint(info2, this.transformPagePoint);
      frame.update(this.updatePoint, true);
    };
    this.handlePointerUp = (event2, info2) => {
      this.end();
      const { onEnd, onSessionEnd, resumeAnimation } = this.handlers;
      if (this.dragSnapToOrigin)
        resumeAnimation && resumeAnimation();
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const panInfo = getPanInfo(event2.type === "pointercancel" ? this.lastMoveEventInfo : transformPoint(info2, this.transformPagePoint), this.history);
      if (this.startEvent && onEnd) {
        onEnd(event2, panInfo);
      }
      onSessionEnd && onSessionEnd(event2, panInfo);
    };
    if (!isPrimaryPointer(event))
      return;
    this.dragSnapToOrigin = dragSnapToOrigin;
    this.handlers = handlers;
    this.transformPagePoint = transformPagePoint;
    this.contextWindow = contextWindow || window;
    const info = extractEventInfo(event);
    const initialInfo = transformPoint(info, this.transformPagePoint);
    const { point } = initialInfo;
    const { timestamp } = frameData;
    this.history = [{ ...point, timestamp }];
    const { onSessionStart } = handlers;
    onSessionStart && onSessionStart(event, getPanInfo(initialInfo, this.history));
    this.removeListeners = pipe3(addPointerEvent(this.contextWindow, "pointermove", this.handlePointerMove), addPointerEvent(this.contextWindow, "pointerup", this.handlePointerUp), addPointerEvent(this.contextWindow, "pointercancel", this.handlePointerUp));
  }
  updateHandlers(handlers) {
    this.handlers = handlers;
  }
  end() {
    this.removeListeners && this.removeListeners();
    cancelFrame(this.updatePoint);
  }
};
function transformPoint(info, transformPagePoint) {
  return transformPagePoint ? { point: transformPagePoint(info.point) } : info;
}
function subtractPoint(a, b) {
  return { x: a.x - b.x, y: a.y - b.y };
}
function getPanInfo({ point }, history) {
  return {
    point,
    delta: subtractPoint(point, lastDevicePoint(history)),
    offset: subtractPoint(point, startDevicePoint(history)),
    velocity: getVelocity2(history, 0.1)
  };
}
function startDevicePoint(history) {
  return history[0];
}
function lastDevicePoint(history) {
  return history[history.length - 1];
}
function getVelocity2(history, timeDelta) {
  if (history.length < 2) {
    return { x: 0, y: 0 };
  }
  let i = history.length - 1;
  let timestampedPoint = null;
  const lastPoint = lastDevicePoint(history);
  while (i >= 0) {
    timestampedPoint = history[i];
    if (lastPoint.timestamp - timestampedPoint.timestamp > secondsToMilliseconds(timeDelta)) {
      break;
    }
    i--;
  }
  if (!timestampedPoint) {
    return { x: 0, y: 0 };
  }
  const time2 = millisecondsToSeconds(lastPoint.timestamp - timestampedPoint.timestamp);
  if (time2 === 0) {
    return { x: 0, y: 0 };
  }
  const currentVelocity = {
    x: (lastPoint.x - timestampedPoint.x) / time2,
    y: (lastPoint.y - timestampedPoint.y) / time2
  };
  if (currentVelocity.x === Infinity) {
    currentVelocity.x = 0;
  }
  if (currentVelocity.y === Infinity) {
    currentVelocity.y = 0;
  }
  return currentVelocity;
}

// node_modules/framer-motion/dist/es/projection/geometry/delta-calc.mjs
function calcLength(axis) {
  return axis.max - axis.min;
}
function isNear(value, target = 0, maxDistance = 0.01) {
  return Math.abs(value - target) <= maxDistance;
}
function calcAxisDelta(delta, source, target, origin = 0.5) {
  delta.origin = origin;
  delta.originPoint = mixNumber(source.min, source.max, delta.origin);
  delta.scale = calcLength(target) / calcLength(source);
  if (isNear(delta.scale, 1, 1e-4) || isNaN(delta.scale))
    delta.scale = 1;
  delta.translate = mixNumber(target.min, target.max, delta.origin) - delta.originPoint;
  if (isNear(delta.translate) || isNaN(delta.translate))
    delta.translate = 0;
}
function calcBoxDelta(delta, source, target, origin) {
  calcAxisDelta(delta.x, source.x, target.x, origin ? origin.originX : void 0);
  calcAxisDelta(delta.y, source.y, target.y, origin ? origin.originY : void 0);
}
function calcRelativeAxis(target, relative, parent) {
  target.min = parent.min + relative.min;
  target.max = target.min + calcLength(relative);
}
function calcRelativeBox(target, relative, parent) {
  calcRelativeAxis(target.x, relative.x, parent.x);
  calcRelativeAxis(target.y, relative.y, parent.y);
}
function calcRelativeAxisPosition(target, layout3, parent) {
  target.min = layout3.min - parent.min;
  target.max = target.min + calcLength(layout3);
}
function calcRelativePosition(target, layout3, parent) {
  calcRelativeAxisPosition(target.x, layout3.x, parent.x);
  calcRelativeAxisPosition(target.y, layout3.y, parent.y);
}

// node_modules/framer-motion/dist/es/gestures/drag/utils/constraints.mjs
function applyConstraints(point, { min: min2, max: max2 }, elastic) {
  if (min2 !== void 0 && point < min2) {
    point = elastic ? mixNumber(min2, point, elastic.min) : Math.max(point, min2);
  } else if (max2 !== void 0 && point > max2) {
    point = elastic ? mixNumber(max2, point, elastic.max) : Math.min(point, max2);
  }
  return point;
}
function calcRelativeAxisConstraints(axis, min2, max2) {
  return {
    min: min2 !== void 0 ? axis.min + min2 : void 0,
    max: max2 !== void 0 ? axis.max + max2 - (axis.max - axis.min) : void 0
  };
}
function calcRelativeConstraints(layoutBox, { top: top2, left: left2, bottom: bottom2, right: right2 }) {
  return {
    x: calcRelativeAxisConstraints(layoutBox.x, left2, right2),
    y: calcRelativeAxisConstraints(layoutBox.y, top2, bottom2)
  };
}
function calcViewportAxisConstraints(layoutAxis, constraintsAxis) {
  let min2 = constraintsAxis.min - layoutAxis.min;
  let max2 = constraintsAxis.max - layoutAxis.max;
  if (constraintsAxis.max - constraintsAxis.min < layoutAxis.max - layoutAxis.min) {
    [min2, max2] = [max2, min2];
  }
  return { min: min2, max: max2 };
}
function calcViewportConstraints(layoutBox, constraintsBox) {
  return {
    x: calcViewportAxisConstraints(layoutBox.x, constraintsBox.x),
    y: calcViewportAxisConstraints(layoutBox.y, constraintsBox.y)
  };
}
function calcOrigin2(source, target) {
  let origin = 0.5;
  const sourceLength = calcLength(source);
  const targetLength = calcLength(target);
  if (targetLength > sourceLength) {
    origin = progress(target.min, target.max - sourceLength, source.min);
  } else if (sourceLength > targetLength) {
    origin = progress(source.min, source.max - targetLength, target.min);
  }
  return clamp(0, 1, origin);
}
function rebaseAxisConstraints(layout3, constraints) {
  const relativeConstraints = {};
  if (constraints.min !== void 0) {
    relativeConstraints.min = constraints.min - layout3.min;
  }
  if (constraints.max !== void 0) {
    relativeConstraints.max = constraints.max - layout3.min;
  }
  return relativeConstraints;
}
var defaultElastic = 0.35;
function resolveDragElastic(dragElastic = defaultElastic) {
  if (dragElastic === false) {
    dragElastic = 0;
  } else if (dragElastic === true) {
    dragElastic = defaultElastic;
  }
  return {
    x: resolveAxisElastic(dragElastic, "left", "right"),
    y: resolveAxisElastic(dragElastic, "top", "bottom")
  };
}
function resolveAxisElastic(dragElastic, minLabel, maxLabel) {
  return {
    min: resolvePointElastic(dragElastic, minLabel),
    max: resolvePointElastic(dragElastic, maxLabel)
  };
}
function resolvePointElastic(dragElastic, label) {
  return typeof dragElastic === "number" ? dragElastic : dragElastic[label] || 0;
}

// node_modules/framer-motion/dist/es/projection/geometry/models.mjs
var createAxisDelta = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
});
var createDelta = () => ({
  x: createAxisDelta(),
  y: createAxisDelta()
});
var createAxis = () => ({ min: 0, max: 0 });
var createBox = () => ({
  x: createAxis(),
  y: createAxis()
});

// node_modules/framer-motion/dist/es/projection/utils/each-axis.mjs
function eachAxis(callback) {
  return [callback("x"), callback("y")];
}

// node_modules/framer-motion/dist/es/projection/geometry/conversion.mjs
function convertBoundingBoxToBox({ top: top2, left: left2, right: right2, bottom: bottom2 }) {
  return {
    x: { min: left2, max: right2 },
    y: { min: top2, max: bottom2 }
  };
}
function convertBoxToBoundingBox({ x, y }) {
  return { top: y.min, right: x.max, bottom: y.max, left: x.min };
}
function transformBoxPoints(point, transformPoint2) {
  if (!transformPoint2)
    return point;
  const topLeft = transformPoint2({ x: point.left, y: point.top });
  const bottomRight = transformPoint2({ x: point.right, y: point.bottom });
  return {
    top: topLeft.y,
    left: topLeft.x,
    bottom: bottomRight.y,
    right: bottomRight.x
  };
}

// node_modules/framer-motion/dist/es/projection/utils/has-transform.mjs
function isIdentityScale(scale3) {
  return scale3 === void 0 || scale3 === 1;
}
function hasScale({ scale: scale3, scaleX, scaleY }) {
  return !isIdentityScale(scale3) || !isIdentityScale(scaleX) || !isIdentityScale(scaleY);
}
function hasTransform(values) {
  return hasScale(values) || has2DTranslate(values) || values.z || values.rotate || values.rotateX || values.rotateY;
}
function has2DTranslate(values) {
  return is2DTranslate(values.x) || is2DTranslate(values.y);
}
function is2DTranslate(value) {
  return value && value !== "0%";
}

// node_modules/framer-motion/dist/es/projection/geometry/delta-apply.mjs
function scalePoint(point, scale3, originPoint) {
  const distanceFromOrigin = point - originPoint;
  const scaled = scale3 * distanceFromOrigin;
  return originPoint + scaled;
}
function applyPointDelta(point, translate, scale3, originPoint, boxScale) {
  if (boxScale !== void 0) {
    point = scalePoint(point, boxScale, originPoint);
  }
  return scalePoint(point, scale3, originPoint) + translate;
}
function applyAxisDelta(axis, translate = 0, scale3 = 1, originPoint, boxScale) {
  axis.min = applyPointDelta(axis.min, translate, scale3, originPoint, boxScale);
  axis.max = applyPointDelta(axis.max, translate, scale3, originPoint, boxScale);
}
function applyBoxDelta(box, { x, y }) {
  applyAxisDelta(box.x, x.translate, x.scale, x.originPoint);
  applyAxisDelta(box.y, y.translate, y.scale, y.originPoint);
}
function applyTreeDeltas(box, treeScale, treePath, isSharedTransition = false) {
  const treeLength = treePath.length;
  if (!treeLength)
    return;
  treeScale.x = treeScale.y = 1;
  let node;
  let delta;
  for (let i = 0; i < treeLength; i++) {
    node = treePath[i];
    delta = node.projectionDelta;
    const instance = node.instance;
    if (instance && instance.style && instance.style.display === "contents") {
      continue;
    }
    if (isSharedTransition && node.options.layoutScroll && node.scroll && node !== node.root) {
      transformBox(box, {
        x: -node.scroll.offset.x,
        y: -node.scroll.offset.y
      });
    }
    if (delta) {
      treeScale.x *= delta.x.scale;
      treeScale.y *= delta.y.scale;
      applyBoxDelta(box, delta);
    }
    if (isSharedTransition && hasTransform(node.latestValues)) {
      transformBox(box, node.latestValues);
    }
  }
  treeScale.x = snapToDefault(treeScale.x);
  treeScale.y = snapToDefault(treeScale.y);
}
function snapToDefault(scale3) {
  if (Number.isInteger(scale3))
    return scale3;
  return scale3 > 1.0000000000001 || scale3 < 0.999999999999 ? scale3 : 1;
}
function translateAxis(axis, distance3) {
  axis.min = axis.min + distance3;
  axis.max = axis.max + distance3;
}
function transformAxis(axis, transforms2, [key, scaleKey, originKey]) {
  const axisOrigin = transforms2[originKey] !== void 0 ? transforms2[originKey] : 0.5;
  const originPoint = mixNumber(axis.min, axis.max, axisOrigin);
  applyAxisDelta(axis, transforms2[key], transforms2[scaleKey], originPoint, transforms2.scale);
}
var xKeys = ["x", "scaleX", "originX"];
var yKeys = ["y", "scaleY", "originY"];
function transformBox(box, transform2) {
  transformAxis(box.x, transform2, xKeys);
  transformAxis(box.y, transform2, yKeys);
}

// node_modules/framer-motion/dist/es/projection/utils/measure.mjs
function measureViewportBox(instance, transformPoint2) {
  return convertBoundingBoxToBox(transformBoxPoints(instance.getBoundingClientRect(), transformPoint2));
}
function measurePageBox(element, rootProjectionNode2, transformPagePoint) {
  const viewportBox = measureViewportBox(element, transformPagePoint);
  const { scroll: scroll2 } = rootProjectionNode2;
  if (scroll2) {
    translateAxis(viewportBox.x, scroll2.offset.x);
    translateAxis(viewportBox.y, scroll2.offset.y);
  }
  return viewportBox;
}

// node_modules/framer-motion/dist/es/utils/get-context-window.mjs
var getContextWindow = ({ current }) => {
  return current ? current.ownerDocument.defaultView : null;
};

// node_modules/framer-motion/dist/es/gestures/drag/VisualElementDragControls.mjs
var elementDragControls = /* @__PURE__ */ new WeakMap();
var VisualElementDragControls = class {
  constructor(visualElement) {
    this.openGlobalLock = null;
    this.isDragging = false;
    this.currentDirection = null;
    this.originPoint = { x: 0, y: 0 };
    this.constraints = false;
    this.hasMutatedConstraints = false;
    this.elastic = createBox();
    this.visualElement = visualElement;
  }
  start(originEvent, { snapToCursor = false } = {}) {
    const { presenceContext } = this.visualElement;
    if (presenceContext && presenceContext.isPresent === false)
      return;
    const onSessionStart = (event) => {
      const { dragSnapToOrigin: dragSnapToOrigin2 } = this.getProps();
      dragSnapToOrigin2 ? this.pauseAnimation() : this.stopAnimation();
      if (snapToCursor) {
        this.snapToCursor(extractEventInfo(event, "page").point);
      }
    };
    const onStart = (event, info) => {
      const { drag: drag2, dragPropagation, onDragStart } = this.getProps();
      if (drag2 && !dragPropagation) {
        if (this.openGlobalLock)
          this.openGlobalLock();
        this.openGlobalLock = getGlobalLock(drag2);
        if (!this.openGlobalLock)
          return;
      }
      this.isDragging = true;
      this.currentDirection = null;
      this.resolveConstraints();
      if (this.visualElement.projection) {
        this.visualElement.projection.isAnimationBlocked = true;
        this.visualElement.projection.target = void 0;
      }
      eachAxis((axis) => {
        let current = this.getAxisMotionValue(axis).get() || 0;
        if (percent.test(current)) {
          const { projection } = this.visualElement;
          if (projection && projection.layout) {
            const measuredAxis = projection.layout.layoutBox[axis];
            if (measuredAxis) {
              const length = calcLength(measuredAxis);
              current = length * (parseFloat(current) / 100);
            }
          }
        }
        this.originPoint[axis] = current;
      });
      if (onDragStart) {
        frame.update(() => onDragStart(event, info), false, true);
      }
      const { animationState } = this.visualElement;
      animationState && animationState.setActive("whileDrag", true);
    };
    const onMove = (event, info) => {
      const { dragPropagation, dragDirectionLock, onDirectionLock, onDrag } = this.getProps();
      if (!dragPropagation && !this.openGlobalLock)
        return;
      const { offset: offset2 } = info;
      if (dragDirectionLock && this.currentDirection === null) {
        this.currentDirection = getCurrentDirection(offset2);
        if (this.currentDirection !== null) {
          onDirectionLock && onDirectionLock(this.currentDirection);
        }
        return;
      }
      this.updateAxis("x", info.point, offset2);
      this.updateAxis("y", info.point, offset2);
      this.visualElement.render();
      onDrag && onDrag(event, info);
    };
    const onSessionEnd = (event, info) => this.stop(event, info);
    const resumeAnimation = () => eachAxis((axis) => {
      var _a7;
      return this.getAnimationState(axis) === "paused" && ((_a7 = this.getAxisMotionValue(axis).animation) === null || _a7 === void 0 ? void 0 : _a7.play());
    });
    const { dragSnapToOrigin } = this.getProps();
    this.panSession = new PanSession(originEvent, {
      onSessionStart,
      onStart,
      onMove,
      onSessionEnd,
      resumeAnimation
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin,
      contextWindow: getContextWindow(this.visualElement)
    });
  }
  stop(event, info) {
    const isDragging = this.isDragging;
    this.cancel();
    if (!isDragging)
      return;
    const { velocity } = info;
    this.startAnimation(velocity);
    const { onDragEnd } = this.getProps();
    if (onDragEnd) {
      frame.update(() => onDragEnd(event, info));
    }
  }
  cancel() {
    this.isDragging = false;
    const { projection, animationState } = this.visualElement;
    if (projection) {
      projection.isAnimationBlocked = false;
    }
    this.panSession && this.panSession.end();
    this.panSession = void 0;
    const { dragPropagation } = this.getProps();
    if (!dragPropagation && this.openGlobalLock) {
      this.openGlobalLock();
      this.openGlobalLock = null;
    }
    animationState && animationState.setActive("whileDrag", false);
  }
  updateAxis(axis, _point, offset2) {
    const { drag: drag2 } = this.getProps();
    if (!offset2 || !shouldDrag(axis, drag2, this.currentDirection))
      return;
    const axisValue = this.getAxisMotionValue(axis);
    let next = this.originPoint[axis] + offset2[axis];
    if (this.constraints && this.constraints[axis]) {
      next = applyConstraints(next, this.constraints[axis], this.elastic[axis]);
    }
    axisValue.set(next);
  }
  resolveConstraints() {
    var _a7;
    const { dragConstraints, dragElastic } = this.getProps();
    const layout3 = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(false) : (_a7 = this.visualElement.projection) === null || _a7 === void 0 ? void 0 : _a7.layout;
    const prevConstraints = this.constraints;
    if (dragConstraints && isRefObject(dragConstraints)) {
      if (!this.constraints) {
        this.constraints = this.resolveRefConstraints();
      }
    } else {
      if (dragConstraints && layout3) {
        this.constraints = calcRelativeConstraints(layout3.layoutBox, dragConstraints);
      } else {
        this.constraints = false;
      }
    }
    this.elastic = resolveDragElastic(dragElastic);
    if (prevConstraints !== this.constraints && layout3 && this.constraints && !this.hasMutatedConstraints) {
      eachAxis((axis) => {
        if (this.getAxisMotionValue(axis)) {
          this.constraints[axis] = rebaseAxisConstraints(layout3.layoutBox[axis], this.constraints[axis]);
        }
      });
    }
  }
  resolveRefConstraints() {
    const { dragConstraints: constraints, onMeasureDragConstraints } = this.getProps();
    if (!constraints || !isRefObject(constraints))
      return false;
    const constraintsElement = constraints.current;
    invariant(constraintsElement !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.");
    const { projection } = this.visualElement;
    if (!projection || !projection.layout)
      return false;
    const constraintsBox = measurePageBox(constraintsElement, projection.root, this.visualElement.getTransformPagePoint());
    let measuredConstraints = calcViewportConstraints(projection.layout.layoutBox, constraintsBox);
    if (onMeasureDragConstraints) {
      const userConstraints = onMeasureDragConstraints(convertBoxToBoundingBox(measuredConstraints));
      this.hasMutatedConstraints = !!userConstraints;
      if (userConstraints) {
        measuredConstraints = convertBoundingBoxToBox(userConstraints);
      }
    }
    return measuredConstraints;
  }
  startAnimation(velocity) {
    const { drag: drag2, dragMomentum, dragElastic, dragTransition, dragSnapToOrigin, onDragTransitionEnd } = this.getProps();
    const constraints = this.constraints || {};
    const momentumAnimations = eachAxis((axis) => {
      if (!shouldDrag(axis, drag2, this.currentDirection)) {
        return;
      }
      let transition3 = constraints && constraints[axis] || {};
      if (dragSnapToOrigin)
        transition3 = { min: 0, max: 0 };
      const bounceStiffness = dragElastic ? 200 : 1e6;
      const bounceDamping = dragElastic ? 40 : 1e7;
      const inertia2 = {
        type: "inertia",
        velocity: dragMomentum ? velocity[axis] : 0,
        bounceStiffness,
        bounceDamping,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10,
        ...dragTransition,
        ...transition3
      };
      return this.startAxisValueAnimation(axis, inertia2);
    });
    return Promise.all(momentumAnimations).then(onDragTransitionEnd);
  }
  startAxisValueAnimation(axis, transition3) {
    const axisValue = this.getAxisMotionValue(axis);
    return axisValue.start(animateMotionValue(axis, axisValue, 0, transition3));
  }
  stopAnimation() {
    eachAxis((axis) => this.getAxisMotionValue(axis).stop());
  }
  pauseAnimation() {
    eachAxis((axis) => {
      var _a7;
      return (_a7 = this.getAxisMotionValue(axis).animation) === null || _a7 === void 0 ? void 0 : _a7.pause();
    });
  }
  getAnimationState(axis) {
    var _a7;
    return (_a7 = this.getAxisMotionValue(axis).animation) === null || _a7 === void 0 ? void 0 : _a7.state;
  }
  /**
   * Drag works differently depending on which props are provided.
   *
   * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
   * - Otherwise, we apply the delta to the x/y motion values.
   */
  getAxisMotionValue(axis) {
    const dragKey = "_drag" + axis.toUpperCase();
    const props = this.visualElement.getProps();
    const externalMotionValue = props[dragKey];
    return externalMotionValue ? externalMotionValue : this.visualElement.getValue(axis, (props.initial ? props.initial[axis] : void 0) || 0);
  }
  snapToCursor(point) {
    eachAxis((axis) => {
      const { drag: drag2 } = this.getProps();
      if (!shouldDrag(axis, drag2, this.currentDirection))
        return;
      const { projection } = this.visualElement;
      const axisValue = this.getAxisMotionValue(axis);
      if (projection && projection.layout) {
        const { min: min2, max: max2 } = projection.layout.layoutBox[axis];
        axisValue.set(point[axis] - mixNumber(min2, max2, 0.5));
      }
    });
  }
  /**
   * When the viewport resizes we want to check if the measured constraints
   * have changed and, if so, reposition the element within those new constraints
   * relative to where it was before the resize.
   */
  scalePositionWithinConstraints() {
    if (!this.visualElement.current)
      return;
    const { drag: drag2, dragConstraints } = this.getProps();
    const { projection } = this.visualElement;
    if (!isRefObject(dragConstraints) || !projection || !this.constraints)
      return;
    this.stopAnimation();
    const boxProgress = { x: 0, y: 0 };
    eachAxis((axis) => {
      const axisValue = this.getAxisMotionValue(axis);
      if (axisValue) {
        const latest = axisValue.get();
        boxProgress[axis] = calcOrigin2({ min: latest, max: latest }, this.constraints[axis]);
      }
    });
    const { transformTemplate: transformTemplate2 } = this.visualElement.getProps();
    this.visualElement.current.style.transform = transformTemplate2 ? transformTemplate2({}, "") : "none";
    projection.root && projection.root.updateScroll();
    projection.updateLayout();
    this.resolveConstraints();
    eachAxis((axis) => {
      if (!shouldDrag(axis, drag2, null))
        return;
      const axisValue = this.getAxisMotionValue(axis);
      const { min: min2, max: max2 } = this.constraints[axis];
      axisValue.set(mixNumber(min2, max2, boxProgress[axis]));
    });
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    elementDragControls.set(this.visualElement, this);
    const element = this.visualElement.current;
    const stopPointerListener = addPointerEvent(element, "pointerdown", (event) => {
      const { drag: drag2, dragListener = true } = this.getProps();
      drag2 && dragListener && this.start(event);
    });
    const measureDragConstraints = () => {
      const { dragConstraints } = this.getProps();
      if (isRefObject(dragConstraints)) {
        this.constraints = this.resolveRefConstraints();
      }
    };
    const { projection } = this.visualElement;
    const stopMeasureLayoutListener = projection.addEventListener("measure", measureDragConstraints);
    if (projection && !projection.layout) {
      projection.root && projection.root.updateScroll();
      projection.updateLayout();
    }
    measureDragConstraints();
    const stopResizeListener = addDomEvent(window, "resize", () => this.scalePositionWithinConstraints());
    const stopLayoutUpdateListener = projection.addEventListener("didUpdate", ({ delta, hasLayoutChanged }) => {
      if (this.isDragging && hasLayoutChanged) {
        eachAxis((axis) => {
          const motionValue2 = this.getAxisMotionValue(axis);
          if (!motionValue2)
            return;
          this.originPoint[axis] += delta[axis].translate;
          motionValue2.set(motionValue2.get() + delta[axis].translate);
        });
        this.visualElement.render();
      }
    });
    return () => {
      stopResizeListener();
      stopPointerListener();
      stopMeasureLayoutListener();
      stopLayoutUpdateListener && stopLayoutUpdateListener();
    };
  }
  getProps() {
    const props = this.visualElement.getProps();
    const { drag: drag2 = false, dragDirectionLock = false, dragPropagation = false, dragConstraints = false, dragElastic = defaultElastic, dragMomentum = true } = props;
    return {
      ...props,
      drag: drag2,
      dragDirectionLock,
      dragPropagation,
      dragConstraints,
      dragElastic,
      dragMomentum
    };
  }
};
function shouldDrag(direction2, drag2, currentDirection) {
  return (drag2 === true || drag2 === direction2) && (currentDirection === null || currentDirection === direction2);
}
function getCurrentDirection(offset2, lockThreshold = 10) {
  let direction2 = null;
  if (Math.abs(offset2.y) > lockThreshold) {
    direction2 = "y";
  } else if (Math.abs(offset2.x) > lockThreshold) {
    direction2 = "x";
  }
  return direction2;
}

// node_modules/framer-motion/dist/es/gestures/drag/index.mjs
var DragGesture = class extends Feature {
  constructor(node) {
    super(node);
    this.removeGroupControls = noop3;
    this.removeListeners = noop3;
    this.controls = new VisualElementDragControls(node);
  }
  mount() {
    const { dragControls } = this.node.getProps();
    if (dragControls) {
      this.removeGroupControls = dragControls.subscribe(this.controls);
    }
    this.removeListeners = this.controls.addListeners() || noop3;
  }
  unmount() {
    this.removeGroupControls();
    this.removeListeners();
  }
};

// node_modules/framer-motion/dist/es/gestures/pan/index.mjs
var asyncHandler = (handler) => (event, info) => {
  if (handler) {
    frame.update(() => handler(event, info));
  }
};
var PanGesture = class extends Feature {
  constructor() {
    super(...arguments);
    this.removePointerDownListener = noop3;
  }
  onPointerDown(pointerDownEvent) {
    this.session = new PanSession(pointerDownEvent, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: getContextWindow(this.node)
    });
  }
  createPanHandlers() {
    const { onPanSessionStart, onPanStart, onPan, onPanEnd } = this.node.getProps();
    return {
      onSessionStart: asyncHandler(onPanSessionStart),
      onStart: asyncHandler(onPanStart),
      onMove: onPan,
      onEnd: (event, info) => {
        delete this.session;
        if (onPanEnd) {
          frame.update(() => onPanEnd(event, info));
        }
      }
    };
  }
  mount() {
    this.removePointerDownListener = addPointerEvent(this.node.current, "pointerdown", (event) => this.onPointerDown(event));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener();
    this.session && this.session.end();
  }
};

// node_modules/framer-motion/dist/es/motion/features/layout/MeasureLayout.mjs
var import_react39 = __toESM(require_react(), 1);

// node_modules/framer-motion/dist/es/components/AnimatePresence/use-presence.mjs
var import_react38 = __toESM(require_react(), 1);
function usePresence() {
  const context = (0, import_react38.useContext)(PresenceContext);
  if (context === null)
    return [true, null];
  const { isPresent: isPresent2, onExitComplete, register } = context;
  const id3 = (0, import_react38.useId)();
  (0, import_react38.useEffect)(() => register(id3), []);
  const safeToRemove = () => onExitComplete && onExitComplete(id3);
  return !isPresent2 && onExitComplete ? [false, safeToRemove] : [true];
}
function useIsPresent() {
  return isPresent((0, import_react38.useContext)(PresenceContext));
}
function isPresent(context) {
  return context === null ? true : context.isPresent;
}

// node_modules/framer-motion/dist/es/projection/node/state.mjs
var globalProjectionState = {
  /**
   * Global flag as to whether the tree has animated since the last time
   * we resized the window
   */
  hasAnimatedSinceResize: true,
  /**
   * We set this to true once, on the first update. Any nodes added to the tree beyond that
   * update will be given a `data-projection-id` attribute.
   */
  hasEverUpdated: false
};

// node_modules/framer-motion/dist/es/projection/styles/scale-border-radius.mjs
function pixelsToPercent(pixels, axis) {
  if (axis.max === axis.min)
    return 0;
  return pixels / (axis.max - axis.min) * 100;
}
var correctBorderRadius = {
  correct: (latest, node) => {
    if (!node.target)
      return latest;
    if (typeof latest === "string") {
      if (px2.test(latest)) {
        latest = parseFloat(latest);
      } else {
        return latest;
      }
    }
    const x = pixelsToPercent(latest, node.target.x);
    const y = pixelsToPercent(latest, node.target.y);
    return `${x}% ${y}%`;
  }
};

// node_modules/framer-motion/dist/es/projection/styles/scale-box-shadow.mjs
var correctBoxShadow = {
  correct: (latest, { treeScale, projectionDelta }) => {
    const original = latest;
    const shadow = complex.parse(latest);
    if (shadow.length > 5)
      return original;
    const template = complex.createTransformer(latest);
    const offset2 = typeof shadow[0] !== "number" ? 1 : 0;
    const xScale = projectionDelta.x.scale * treeScale.x;
    const yScale = projectionDelta.y.scale * treeScale.y;
    shadow[0 + offset2] /= xScale;
    shadow[1 + offset2] /= yScale;
    const averageScale = mixNumber(xScale, yScale, 0.5);
    if (typeof shadow[2 + offset2] === "number")
      shadow[2 + offset2] /= averageScale;
    if (typeof shadow[3 + offset2] === "number")
      shadow[3 + offset2] /= averageScale;
    return template(shadow);
  }
};

// node_modules/framer-motion/dist/es/motion/features/layout/MeasureLayout.mjs
var MeasureLayoutWithContext = class extends import_react39.default.Component {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement, layoutGroup, switchLayoutGroup, layoutId } = this.props;
    const { projection } = visualElement;
    addScaleCorrector(defaultScaleCorrectors);
    if (projection) {
      if (layoutGroup.group)
        layoutGroup.group.add(projection);
      if (switchLayoutGroup && switchLayoutGroup.register && layoutId) {
        switchLayoutGroup.register(projection);
      }
      projection.root.didUpdate();
      projection.addEventListener("animationComplete", () => {
        this.safeToRemove();
      });
      projection.setOptions({
        ...projection.options,
        onExitComplete: () => this.safeToRemove()
      });
    }
    globalProjectionState.hasEverUpdated = true;
  }
  getSnapshotBeforeUpdate(prevProps) {
    const { layoutDependency, visualElement, drag: drag2, isPresent: isPresent2 } = this.props;
    const projection = visualElement.projection;
    if (!projection)
      return null;
    projection.isPresent = isPresent2;
    if (drag2 || prevProps.layoutDependency !== layoutDependency || layoutDependency === void 0) {
      projection.willUpdate();
    } else {
      this.safeToRemove();
    }
    if (prevProps.isPresent !== isPresent2) {
      if (isPresent2) {
        projection.promote();
      } else if (!projection.relegate()) {
        frame.postRender(() => {
          const stack = projection.getStack();
          if (!stack || !stack.members.length) {
            this.safeToRemove();
          }
        });
      }
    }
    return null;
  }
  componentDidUpdate() {
    const { projection } = this.props.visualElement;
    if (projection) {
      projection.root.didUpdate();
      microtask.postRender(() => {
        if (!projection.currentAnimation && projection.isLead()) {
          this.safeToRemove();
        }
      });
    }
  }
  componentWillUnmount() {
    const { visualElement, layoutGroup, switchLayoutGroup: promoteContext } = this.props;
    const { projection } = visualElement;
    if (projection) {
      projection.scheduleCheckAfterUnmount();
      if (layoutGroup && layoutGroup.group)
        layoutGroup.group.remove(projection);
      if (promoteContext && promoteContext.deregister)
        promoteContext.deregister(projection);
    }
  }
  safeToRemove() {
    const { safeToRemove } = this.props;
    safeToRemove && safeToRemove();
  }
  render() {
    return null;
  }
};
function MeasureLayout(props) {
  const [isPresent2, safeToRemove] = usePresence();
  const layoutGroup = (0, import_react39.useContext)(LayoutGroupContext);
  return import_react39.default.createElement(MeasureLayoutWithContext, { ...props, layoutGroup, switchLayoutGroup: (0, import_react39.useContext)(SwitchLayoutGroupContext), isPresent: isPresent2, safeToRemove });
}
var defaultScaleCorrectors = {
  borderRadius: {
    ...correctBorderRadius,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: correctBorderRadius,
  borderTopRightRadius: correctBorderRadius,
  borderBottomLeftRadius: correctBorderRadius,
  borderBottomRightRadius: correctBorderRadius,
  boxShadow: correctBoxShadow
};

// node_modules/framer-motion/dist/es/projection/animation/mix-values.mjs
var borders2 = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"];
var numBorders = borders2.length;
var asNumber = (value) => typeof value === "string" ? parseFloat(value) : value;
var isPx = (value) => typeof value === "number" || px2.test(value);
function mixValues(target, follow, lead, progress2, shouldCrossfadeOpacity, isOnlyMember) {
  if (shouldCrossfadeOpacity) {
    target.opacity = mixNumber(
      0,
      // TODO Reinstate this if only child
      lead.opacity !== void 0 ? lead.opacity : 1,
      easeCrossfadeIn(progress2)
    );
    target.opacityExit = mixNumber(follow.opacity !== void 0 ? follow.opacity : 1, 0, easeCrossfadeOut(progress2));
  } else if (isOnlyMember) {
    target.opacity = mixNumber(follow.opacity !== void 0 ? follow.opacity : 1, lead.opacity !== void 0 ? lead.opacity : 1, progress2);
  }
  for (let i = 0; i < numBorders; i++) {
    const borderLabel = `border${borders2[i]}Radius`;
    let followRadius = getRadius(follow, borderLabel);
    let leadRadius = getRadius(lead, borderLabel);
    if (followRadius === void 0 && leadRadius === void 0)
      continue;
    followRadius || (followRadius = 0);
    leadRadius || (leadRadius = 0);
    const canMix = followRadius === 0 || leadRadius === 0 || isPx(followRadius) === isPx(leadRadius);
    if (canMix) {
      target[borderLabel] = Math.max(mixNumber(asNumber(followRadius), asNumber(leadRadius), progress2), 0);
      if (percent.test(leadRadius) || percent.test(followRadius)) {
        target[borderLabel] += "%";
      }
    } else {
      target[borderLabel] = leadRadius;
    }
  }
  if (follow.rotate || lead.rotate) {
    target.rotate = mixNumber(follow.rotate || 0, lead.rotate || 0, progress2);
  }
}
function getRadius(values, radiusName) {
  return values[radiusName] !== void 0 ? values[radiusName] : values.borderRadius;
}
var easeCrossfadeIn = compress(0, 0.5, circOut);
var easeCrossfadeOut = compress(0.5, 0.95, noop3);
function compress(min2, max2, easing) {
  return (p) => {
    if (p < min2)
      return 0;
    if (p > max2)
      return 1;
    return easing(progress(min2, max2, p));
  };
}

// node_modules/framer-motion/dist/es/projection/geometry/copy.mjs
function copyAxisInto(axis, originAxis) {
  axis.min = originAxis.min;
  axis.max = originAxis.max;
}
function copyBoxInto(box, originBox) {
  copyAxisInto(box.x, originBox.x);
  copyAxisInto(box.y, originBox.y);
}

// node_modules/framer-motion/dist/es/projection/geometry/delta-remove.mjs
function removePointDelta(point, translate, scale3, originPoint, boxScale) {
  point -= translate;
  point = scalePoint(point, 1 / scale3, originPoint);
  if (boxScale !== void 0) {
    point = scalePoint(point, 1 / boxScale, originPoint);
  }
  return point;
}
function removeAxisDelta(axis, translate = 0, scale3 = 1, origin = 0.5, boxScale, originAxis = axis, sourceAxis = axis) {
  if (percent.test(translate)) {
    translate = parseFloat(translate);
    const relativeProgress = mixNumber(sourceAxis.min, sourceAxis.max, translate / 100);
    translate = relativeProgress - sourceAxis.min;
  }
  if (typeof translate !== "number")
    return;
  let originPoint = mixNumber(originAxis.min, originAxis.max, origin);
  if (axis === originAxis)
    originPoint -= translate;
  axis.min = removePointDelta(axis.min, translate, scale3, originPoint, boxScale);
  axis.max = removePointDelta(axis.max, translate, scale3, originPoint, boxScale);
}
function removeAxisTransforms(axis, transforms2, [key, scaleKey, originKey], origin, sourceAxis) {
  removeAxisDelta(axis, transforms2[key], transforms2[scaleKey], transforms2[originKey], transforms2.scale, origin, sourceAxis);
}
var xKeys2 = ["x", "scaleX", "originX"];
var yKeys2 = ["y", "scaleY", "originY"];
function removeBoxTransforms(box, transforms2, originBox, sourceBox) {
  removeAxisTransforms(box.x, transforms2, xKeys2, originBox ? originBox.x : void 0, sourceBox ? sourceBox.x : void 0);
  removeAxisTransforms(box.y, transforms2, yKeys2, originBox ? originBox.y : void 0, sourceBox ? sourceBox.y : void 0);
}

// node_modules/framer-motion/dist/es/projection/geometry/utils.mjs
function isAxisDeltaZero(delta) {
  return delta.translate === 0 && delta.scale === 1;
}
function isDeltaZero(delta) {
  return isAxisDeltaZero(delta.x) && isAxisDeltaZero(delta.y);
}
function boxEquals(a, b) {
  return a.x.min === b.x.min && a.x.max === b.x.max && a.y.min === b.y.min && a.y.max === b.y.max;
}
function boxEqualsRounded(a, b) {
  return Math.round(a.x.min) === Math.round(b.x.min) && Math.round(a.x.max) === Math.round(b.x.max) && Math.round(a.y.min) === Math.round(b.y.min) && Math.round(a.y.max) === Math.round(b.y.max);
}
function aspectRatio(box) {
  return calcLength(box.x) / calcLength(box.y);
}

// node_modules/framer-motion/dist/es/projection/shared/stack.mjs
var NodeStack = class {
  constructor() {
    this.members = [];
  }
  add(node) {
    addUniqueItem(this.members, node);
    node.scheduleRender();
  }
  remove(node) {
    removeItem(this.members, node);
    if (node === this.prevLead) {
      this.prevLead = void 0;
    }
    if (node === this.lead) {
      const prevLead = this.members[this.members.length - 1];
      if (prevLead) {
        this.promote(prevLead);
      }
    }
  }
  relegate(node) {
    const indexOfNode = this.members.findIndex((member) => node === member);
    if (indexOfNode === 0)
      return false;
    let prevLead;
    for (let i = indexOfNode; i >= 0; i--) {
      const member = this.members[i];
      if (member.isPresent !== false) {
        prevLead = member;
        break;
      }
    }
    if (prevLead) {
      this.promote(prevLead);
      return true;
    } else {
      return false;
    }
  }
  promote(node, preserveFollowOpacity) {
    const prevLead = this.lead;
    if (node === prevLead)
      return;
    this.prevLead = prevLead;
    this.lead = node;
    node.show();
    if (prevLead) {
      prevLead.instance && prevLead.scheduleRender();
      node.scheduleRender();
      node.resumeFrom = prevLead;
      if (preserveFollowOpacity) {
        node.resumeFrom.preserveOpacity = true;
      }
      if (prevLead.snapshot) {
        node.snapshot = prevLead.snapshot;
        node.snapshot.latestValues = prevLead.animationValues || prevLead.latestValues;
      }
      if (node.root && node.root.isUpdating) {
        node.isLayoutDirty = true;
      }
      const { crossfade } = node.options;
      if (crossfade === false) {
        prevLead.hide();
      }
    }
  }
  exitAnimationComplete() {
    this.members.forEach((node) => {
      const { options, resumingFrom } = node;
      options.onExitComplete && options.onExitComplete();
      if (resumingFrom) {
        resumingFrom.options.onExitComplete && resumingFrom.options.onExitComplete();
      }
    });
  }
  scheduleRender() {
    this.members.forEach((node) => {
      node.instance && node.scheduleRender(false);
    });
  }
  /**
   * Clear any leads that have been removed this render to prevent them from being
   * used in future animations and to prevent memory leaks
   */
  removeLeadSnapshot() {
    if (this.lead && this.lead.snapshot) {
      this.lead.snapshot = void 0;
    }
  }
};

// node_modules/framer-motion/dist/es/projection/styles/transform.mjs
function buildProjectionTransform(delta, treeScale, latestTransform) {
  let transform2 = "";
  const xTranslate = delta.x.translate / treeScale.x;
  const yTranslate = delta.y.translate / treeScale.y;
  if (xTranslate || yTranslate) {
    transform2 = `translate3d(${xTranslate}px, ${yTranslate}px, 0) `;
  }
  if (treeScale.x !== 1 || treeScale.y !== 1) {
    transform2 += `scale(${1 / treeScale.x}, ${1 / treeScale.y}) `;
  }
  if (latestTransform) {
    const { rotate, rotateX, rotateY } = latestTransform;
    if (rotate)
      transform2 += `rotate(${rotate}deg) `;
    if (rotateX)
      transform2 += `rotateX(${rotateX}deg) `;
    if (rotateY)
      transform2 += `rotateY(${rotateY}deg) `;
  }
  const elementScaleX = delta.x.scale * treeScale.x;
  const elementScaleY = delta.y.scale * treeScale.y;
  if (elementScaleX !== 1 || elementScaleY !== 1) {
    transform2 += `scale(${elementScaleX}, ${elementScaleY})`;
  }
  return transform2 || "none";
}

// node_modules/framer-motion/dist/es/render/utils/compare-by-depth.mjs
var compareByDepth = (a, b) => a.depth - b.depth;

// node_modules/framer-motion/dist/es/render/utils/flat-tree.mjs
var FlatTree = class {
  constructor() {
    this.children = [];
    this.isDirty = false;
  }
  add(child) {
    addUniqueItem(this.children, child);
    this.isDirty = true;
  }
  remove(child) {
    removeItem(this.children, child);
    this.isDirty = true;
  }
  forEach(callback) {
    this.isDirty && this.children.sort(compareByDepth);
    this.isDirty = false;
    this.children.forEach(callback);
  }
};

// node_modules/framer-motion/dist/es/utils/delay.mjs
function delay(callback, timeout) {
  const start2 = time.now();
  const checkElapsed = ({ timestamp }) => {
    const elapsed = timestamp - start2;
    if (elapsed >= timeout) {
      cancelFrame(checkElapsed);
      callback(elapsed - timeout);
    }
  };
  frame.read(checkElapsed, true);
  return () => cancelFrame(checkElapsed);
}

// node_modules/framer-motion/dist/es/debug/record.mjs
function record(data) {
  if (window.MotionDebug) {
    window.MotionDebug.record(data);
  }
}

// node_modules/framer-motion/dist/es/render/dom/utils/is-svg-element.mjs
function isSVGElement(element) {
  return element instanceof SVGElement && element.tagName !== "svg";
}

// node_modules/framer-motion/dist/es/animation/interfaces/single-value.mjs
function animateSingleValue(value, keyframes3, options) {
  const motionValue$1 = isMotionValue(value) ? value : motionValue(value);
  motionValue$1.start(animateMotionValue("", motionValue$1, keyframes3, options));
  return motionValue$1.animation;
}

// node_modules/framer-motion/dist/es/projection/node/create-projection-node.mjs
var transformAxes = ["", "X", "Y", "Z"];
var hiddenVisibility = { visibility: "hidden" };
var animationTarget = 1e3;
var id2 = 0;
var projectionFrameData = {
  type: "projectionFrame",
  totalNodes: 0,
  resolvedTargetDeltas: 0,
  recalculatedProjection: 0
};
function createProjectionNode({ attachResizeListener, defaultParent, measureScroll, checkIsScrollRoot, resetTransform }) {
  return class ProjectionNode {
    constructor(latestValues = {}, parent = defaultParent === null || defaultParent === void 0 ? void 0 : defaultParent()) {
      this.id = id2++;
      this.animationId = 0;
      this.children = /* @__PURE__ */ new Set();
      this.options = {};
      this.isTreeAnimating = false;
      this.isAnimationBlocked = false;
      this.isLayoutDirty = false;
      this.isProjectionDirty = false;
      this.isSharedProjectionDirty = false;
      this.isTransformDirty = false;
      this.updateManuallyBlocked = false;
      this.updateBlockedByResize = false;
      this.isUpdating = false;
      this.isSVG = false;
      this.needsReset = false;
      this.shouldResetTransform = false;
      this.treeScale = { x: 1, y: 1 };
      this.eventHandlers = /* @__PURE__ */ new Map();
      this.hasTreeAnimated = false;
      this.updateScheduled = false;
      this.projectionUpdateScheduled = false;
      this.checkUpdateFailed = () => {
        if (this.isUpdating) {
          this.isUpdating = false;
          this.clearAllSnapshots();
        }
      };
      this.updateProjection = () => {
        this.projectionUpdateScheduled = false;
        projectionFrameData.totalNodes = projectionFrameData.resolvedTargetDeltas = projectionFrameData.recalculatedProjection = 0;
        this.nodes.forEach(propagateDirtyNodes);
        this.nodes.forEach(resolveTargetDelta);
        this.nodes.forEach(calcProjection);
        this.nodes.forEach(cleanDirtyNodes);
        record(projectionFrameData);
      };
      this.hasProjected = false;
      this.isVisible = true;
      this.animationProgress = 0;
      this.sharedNodes = /* @__PURE__ */ new Map();
      this.latestValues = latestValues;
      this.root = parent ? parent.root || parent : this;
      this.path = parent ? [...parent.path, parent] : [];
      this.parent = parent;
      this.depth = parent ? parent.depth + 1 : 0;
      for (let i = 0; i < this.path.length; i++) {
        this.path[i].shouldResetTransform = true;
      }
      if (this.root === this)
        this.nodes = new FlatTree();
    }
    addEventListener(name, handler) {
      if (!this.eventHandlers.has(name)) {
        this.eventHandlers.set(name, new SubscriptionManager());
      }
      return this.eventHandlers.get(name).add(handler);
    }
    notifyListeners(name, ...args) {
      const subscriptionManager = this.eventHandlers.get(name);
      subscriptionManager && subscriptionManager.notify(...args);
    }
    hasListeners(name) {
      return this.eventHandlers.has(name);
    }
    /**
     * Lifecycles
     */
    mount(instance, isLayoutDirty = this.root.hasTreeAnimated) {
      if (this.instance)
        return;
      this.isSVG = isSVGElement(instance);
      this.instance = instance;
      const { layoutId, layout: layout3, visualElement } = this.options;
      if (visualElement && !visualElement.current) {
        visualElement.mount(instance);
      }
      this.root.nodes.add(this);
      this.parent && this.parent.children.add(this);
      if (isLayoutDirty && (layout3 || layoutId)) {
        this.isLayoutDirty = true;
      }
      if (attachResizeListener) {
        let cancelDelay;
        const resizeUnblockUpdate = () => this.root.updateBlockedByResize = false;
        attachResizeListener(instance, () => {
          this.root.updateBlockedByResize = true;
          cancelDelay && cancelDelay();
          cancelDelay = delay(resizeUnblockUpdate, 250);
          if (globalProjectionState.hasAnimatedSinceResize) {
            globalProjectionState.hasAnimatedSinceResize = false;
            this.nodes.forEach(finishAnimation);
          }
        });
      }
      if (layoutId) {
        this.root.registerSharedNode(layoutId, this);
      }
      if (this.options.animate !== false && visualElement && (layoutId || layout3)) {
        this.addEventListener("didUpdate", ({ delta, hasLayoutChanged, hasRelativeTargetChanged, layout: newLayout }) => {
          if (this.isTreeAnimationBlocked()) {
            this.target = void 0;
            this.relativeTarget = void 0;
            return;
          }
          const layoutTransition = this.options.transition || visualElement.getDefaultTransition() || defaultLayoutTransition;
          const { onLayoutAnimationStart, onLayoutAnimationComplete } = visualElement.getProps();
          const targetChanged = !this.targetLayout || !boxEqualsRounded(this.targetLayout, newLayout) || hasRelativeTargetChanged;
          const hasOnlyRelativeTargetChanged = !hasLayoutChanged && hasRelativeTargetChanged;
          if (this.options.layoutRoot || this.resumeFrom && this.resumeFrom.instance || hasOnlyRelativeTargetChanged || hasLayoutChanged && (targetChanged || !this.currentAnimation)) {
            if (this.resumeFrom) {
              this.resumingFrom = this.resumeFrom;
              this.resumingFrom.resumingFrom = void 0;
            }
            this.setAnimationOrigin(delta, hasOnlyRelativeTargetChanged);
            const animationOptions = {
              ...getValueTransition(layoutTransition, "layout"),
              onPlay: onLayoutAnimationStart,
              onComplete: onLayoutAnimationComplete
            };
            if (visualElement.shouldReduceMotion || this.options.layoutRoot) {
              animationOptions.delay = 0;
              animationOptions.type = false;
            }
            this.startAnimation(animationOptions);
          } else {
            if (!hasLayoutChanged) {
              finishAnimation(this);
            }
            if (this.isLead() && this.options.onExitComplete) {
              this.options.onExitComplete();
            }
          }
          this.targetLayout = newLayout;
        });
      }
    }
    unmount() {
      this.options.layoutId && this.willUpdate();
      this.root.nodes.remove(this);
      const stack = this.getStack();
      stack && stack.remove(this);
      this.parent && this.parent.children.delete(this);
      this.instance = void 0;
      cancelFrame(this.updateProjection);
    }
    // only on the root
    blockUpdate() {
      this.updateManuallyBlocked = true;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = false;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || false;
    }
    // Note: currently only running on root node
    startUpdate() {
      if (this.isUpdateBlocked())
        return;
      this.isUpdating = true;
      this.nodes && this.nodes.forEach(resetRotation);
      this.animationId++;
    }
    getTransformTemplate() {
      const { visualElement } = this.options;
      return visualElement && visualElement.getProps().transformTemplate;
    }
    willUpdate(shouldNotifyListeners = true) {
      this.root.hasTreeAnimated = true;
      if (this.root.isUpdateBlocked()) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      !this.root.isUpdating && this.root.startUpdate();
      if (this.isLayoutDirty)
        return;
      this.isLayoutDirty = true;
      for (let i = 0; i < this.path.length; i++) {
        const node = this.path[i];
        node.shouldResetTransform = true;
        node.updateScroll("snapshot");
        if (node.options.layoutRoot) {
          node.willUpdate(false);
        }
      }
      const { layoutId, layout: layout3 } = this.options;
      if (layoutId === void 0 && !layout3)
        return;
      const transformTemplate2 = this.getTransformTemplate();
      this.prevTransformTemplateValue = transformTemplate2 ? transformTemplate2(this.latestValues, "") : void 0;
      this.updateSnapshot();
      shouldNotifyListeners && this.notifyListeners("willUpdate");
    }
    update() {
      this.updateScheduled = false;
      const updateWasBlocked = this.isUpdateBlocked();
      if (updateWasBlocked) {
        this.unblockUpdate();
        this.clearAllSnapshots();
        this.nodes.forEach(clearMeasurements);
        return;
      }
      if (!this.isUpdating) {
        this.nodes.forEach(clearIsLayoutDirty);
      }
      this.isUpdating = false;
      if (window.HandoffCancelAllAnimations) {
        window.HandoffCancelAllAnimations();
      }
      this.nodes.forEach(resetTransformStyle);
      this.nodes.forEach(updateLayout);
      this.nodes.forEach(notifyLayoutUpdate);
      this.clearAllSnapshots();
      const now2 = time.now();
      frameData.delta = clamp(0, 1e3 / 60, now2 - frameData.timestamp);
      frameData.timestamp = now2;
      frameData.isProcessing = true;
      steps.update.process(frameData);
      steps.preRender.process(frameData);
      steps.render.process(frameData);
      frameData.isProcessing = false;
    }
    didUpdate() {
      if (!this.updateScheduled) {
        this.updateScheduled = true;
        microtask.read(() => this.update());
      }
    }
    clearAllSnapshots() {
      this.nodes.forEach(clearSnapshot);
      this.sharedNodes.forEach(removeLeadSnapshots);
    }
    scheduleUpdateProjection() {
      if (!this.projectionUpdateScheduled) {
        this.projectionUpdateScheduled = true;
        frame.preRender(this.updateProjection, false, true);
      }
    }
    scheduleCheckAfterUnmount() {
      frame.postRender(() => {
        if (this.isLayoutDirty) {
          this.root.didUpdate();
        } else {
          this.root.checkUpdateFailed();
        }
      });
    }
    /**
     * Update measurements
     */
    updateSnapshot() {
      if (this.snapshot || !this.instance)
        return;
      this.snapshot = this.measure();
    }
    updateLayout() {
      if (!this.instance)
        return;
      this.updateScroll();
      if (!(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty) {
        return;
      }
      if (this.resumeFrom && !this.resumeFrom.instance) {
        for (let i = 0; i < this.path.length; i++) {
          const node = this.path[i];
          node.updateScroll();
        }
      }
      const prevLayout = this.layout;
      this.layout = this.measure(false);
      this.layoutCorrected = createBox();
      this.isLayoutDirty = false;
      this.projectionDelta = void 0;
      this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement } = this.options;
      visualElement && visualElement.notify("LayoutMeasure", this.layout.layoutBox, prevLayout ? prevLayout.layoutBox : void 0);
    }
    updateScroll(phase = "measure") {
      let needsMeasurement = Boolean(this.options.layoutScroll && this.instance);
      if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === phase) {
        needsMeasurement = false;
      }
      if (needsMeasurement) {
        this.scroll = {
          animationId: this.root.animationId,
          phase,
          isRoot: checkIsScrollRoot(this.instance),
          offset: measureScroll(this.instance)
        };
      }
    }
    resetTransform() {
      if (!resetTransform)
        return;
      const isResetRequested = this.isLayoutDirty || this.shouldResetTransform;
      const hasProjection = this.projectionDelta && !isDeltaZero(this.projectionDelta);
      const transformTemplate2 = this.getTransformTemplate();
      const transformTemplateValue = transformTemplate2 ? transformTemplate2(this.latestValues, "") : void 0;
      const transformTemplateHasChanged = transformTemplateValue !== this.prevTransformTemplateValue;
      if (isResetRequested && (hasProjection || hasTransform(this.latestValues) || transformTemplateHasChanged)) {
        resetTransform(this.instance, transformTemplateValue);
        this.shouldResetTransform = false;
        this.scheduleRender();
      }
    }
    measure(removeTransform = true) {
      const pageBox = this.measurePageBox();
      let layoutBox = this.removeElementScroll(pageBox);
      if (removeTransform) {
        layoutBox = this.removeTransform(layoutBox);
      }
      roundBox(layoutBox);
      return {
        animationId: this.root.animationId,
        measuredBox: pageBox,
        layoutBox,
        latestValues: {},
        source: this.id
      };
    }
    measurePageBox() {
      const { visualElement } = this.options;
      if (!visualElement)
        return createBox();
      const box = visualElement.measureViewportBox();
      const { scroll: scroll2 } = this.root;
      if (scroll2) {
        translateAxis(box.x, scroll2.offset.x);
        translateAxis(box.y, scroll2.offset.y);
      }
      return box;
    }
    removeElementScroll(box) {
      const boxWithoutScroll = createBox();
      copyBoxInto(boxWithoutScroll, box);
      for (let i = 0; i < this.path.length; i++) {
        const node = this.path[i];
        const { scroll: scroll2, options } = node;
        if (node !== this.root && scroll2 && options.layoutScroll) {
          if (scroll2.isRoot) {
            copyBoxInto(boxWithoutScroll, box);
            const { scroll: rootScroll } = this.root;
            if (rootScroll) {
              translateAxis(boxWithoutScroll.x, -rootScroll.offset.x);
              translateAxis(boxWithoutScroll.y, -rootScroll.offset.y);
            }
          }
          translateAxis(boxWithoutScroll.x, scroll2.offset.x);
          translateAxis(boxWithoutScroll.y, scroll2.offset.y);
        }
      }
      return boxWithoutScroll;
    }
    applyTransform(box, transformOnly = false) {
      const withTransforms = createBox();
      copyBoxInto(withTransforms, box);
      for (let i = 0; i < this.path.length; i++) {
        const node = this.path[i];
        if (!transformOnly && node.options.layoutScroll && node.scroll && node !== node.root) {
          transformBox(withTransforms, {
            x: -node.scroll.offset.x,
            y: -node.scroll.offset.y
          });
        }
        if (!hasTransform(node.latestValues))
          continue;
        transformBox(withTransforms, node.latestValues);
      }
      if (hasTransform(this.latestValues)) {
        transformBox(withTransforms, this.latestValues);
      }
      return withTransforms;
    }
    removeTransform(box) {
      const boxWithoutTransform = createBox();
      copyBoxInto(boxWithoutTransform, box);
      for (let i = 0; i < this.path.length; i++) {
        const node = this.path[i];
        if (!node.instance)
          continue;
        if (!hasTransform(node.latestValues))
          continue;
        hasScale(node.latestValues) && node.updateSnapshot();
        const sourceBox = createBox();
        const nodeBox = node.measurePageBox();
        copyBoxInto(sourceBox, nodeBox);
        removeBoxTransforms(boxWithoutTransform, node.latestValues, node.snapshot ? node.snapshot.layoutBox : void 0, sourceBox);
      }
      if (hasTransform(this.latestValues)) {
        removeBoxTransforms(boxWithoutTransform, this.latestValues);
      }
      return boxWithoutTransform;
    }
    setTargetDelta(delta) {
      this.targetDelta = delta;
      this.root.scheduleUpdateProjection();
      this.isProjectionDirty = true;
    }
    setOptions(options) {
      this.options = {
        ...this.options,
        ...options,
        crossfade: options.crossfade !== void 0 ? options.crossfade : true
      };
    }
    clearMeasurements() {
      this.scroll = void 0;
      this.layout = void 0;
      this.snapshot = void 0;
      this.prevTransformTemplateValue = void 0;
      this.targetDelta = void 0;
      this.target = void 0;
      this.isLayoutDirty = false;
    }
    forceRelativeParentToResolveTarget() {
      if (!this.relativeParent)
        return;
      if (this.relativeParent.resolvedRelativeTargetAt !== frameData.timestamp) {
        this.relativeParent.resolveTargetDelta(true);
      }
    }
    resolveTargetDelta(forceRecalculation = false) {
      var _a7;
      const lead = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = lead.isProjectionDirty);
      this.isTransformDirty || (this.isTransformDirty = lead.isTransformDirty);
      this.isSharedProjectionDirty || (this.isSharedProjectionDirty = lead.isSharedProjectionDirty);
      const isShared = Boolean(this.resumingFrom) || this !== lead;
      const canSkip = !(forceRecalculation || isShared && this.isSharedProjectionDirty || this.isProjectionDirty || ((_a7 = this.parent) === null || _a7 === void 0 ? void 0 : _a7.isProjectionDirty) || this.attemptToResolveRelativeTarget);
      if (canSkip)
        return;
      const { layout: layout3, layoutId } = this.options;
      if (!this.layout || !(layout3 || layoutId))
        return;
      this.resolvedRelativeTargetAt = frameData.timestamp;
      if (!this.targetDelta && !this.relativeTarget) {
        const relativeParent = this.getClosestProjectingParent();
        if (relativeParent && relativeParent.layout && this.animationProgress !== 1) {
          this.relativeParent = relativeParent;
          this.forceRelativeParentToResolveTarget();
          this.relativeTarget = createBox();
          this.relativeTargetOrigin = createBox();
          calcRelativePosition(this.relativeTargetOrigin, this.layout.layoutBox, relativeParent.layout.layoutBox);
          copyBoxInto(this.relativeTarget, this.relativeTargetOrigin);
        } else {
          this.relativeParent = this.relativeTarget = void 0;
        }
      }
      if (!this.relativeTarget && !this.targetDelta)
        return;
      if (!this.target) {
        this.target = createBox();
        this.targetWithTransforms = createBox();
      }
      if (this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target) {
        this.forceRelativeParentToResolveTarget();
        calcRelativeBox(this.target, this.relativeTarget, this.relativeParent.target);
      } else if (this.targetDelta) {
        if (Boolean(this.resumingFrom)) {
          this.target = this.applyTransform(this.layout.layoutBox);
        } else {
          copyBoxInto(this.target, this.layout.layoutBox);
        }
        applyBoxDelta(this.target, this.targetDelta);
      } else {
        copyBoxInto(this.target, this.layout.layoutBox);
      }
      if (this.attemptToResolveRelativeTarget) {
        this.attemptToResolveRelativeTarget = false;
        const relativeParent = this.getClosestProjectingParent();
        if (relativeParent && Boolean(relativeParent.resumingFrom) === Boolean(this.resumingFrom) && !relativeParent.options.layoutScroll && relativeParent.target && this.animationProgress !== 1) {
          this.relativeParent = relativeParent;
          this.forceRelativeParentToResolveTarget();
          this.relativeTarget = createBox();
          this.relativeTargetOrigin = createBox();
          calcRelativePosition(this.relativeTargetOrigin, this.target, relativeParent.target);
          copyBoxInto(this.relativeTarget, this.relativeTargetOrigin);
        } else {
          this.relativeParent = this.relativeTarget = void 0;
        }
      }
      projectionFrameData.resolvedTargetDeltas++;
    }
    getClosestProjectingParent() {
      if (!this.parent || hasScale(this.parent.latestValues) || has2DTranslate(this.parent.latestValues)) {
        return void 0;
      }
      if (this.parent.isProjecting()) {
        return this.parent;
      } else {
        return this.parent.getClosestProjectingParent();
      }
    }
    isProjecting() {
      return Boolean((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    calcProjection() {
      var _a7;
      const lead = this.getLead();
      const isShared = Boolean(this.resumingFrom) || this !== lead;
      let canSkip = true;
      if (this.isProjectionDirty || ((_a7 = this.parent) === null || _a7 === void 0 ? void 0 : _a7.isProjectionDirty)) {
        canSkip = false;
      }
      if (isShared && (this.isSharedProjectionDirty || this.isTransformDirty)) {
        canSkip = false;
      }
      if (this.resolvedRelativeTargetAt === frameData.timestamp) {
        canSkip = false;
      }
      if (canSkip)
        return;
      const { layout: layout3, layoutId } = this.options;
      this.isTreeAnimating = Boolean(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation);
      if (!this.isTreeAnimating) {
        this.targetDelta = this.relativeTarget = void 0;
      }
      if (!this.layout || !(layout3 || layoutId))
        return;
      copyBoxInto(this.layoutCorrected, this.layout.layoutBox);
      const prevTreeScaleX = this.treeScale.x;
      const prevTreeScaleY = this.treeScale.y;
      applyTreeDeltas(this.layoutCorrected, this.treeScale, this.path, isShared);
      if (lead.layout && !lead.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1)) {
        lead.target = lead.layout.layoutBox;
        lead.targetWithTransforms = createBox();
      }
      const { target } = lead;
      if (!target) {
        if (this.projectionTransform) {
          this.projectionDelta = createDelta();
          this.projectionTransform = "none";
          this.scheduleRender();
        }
        return;
      }
      if (!this.projectionDelta) {
        this.projectionDelta = createDelta();
        this.projectionDeltaWithTransform = createDelta();
      }
      const prevProjectionTransform = this.projectionTransform;
      calcBoxDelta(this.projectionDelta, this.layoutCorrected, target, this.latestValues);
      this.projectionTransform = buildProjectionTransform(this.projectionDelta, this.treeScale);
      if (this.projectionTransform !== prevProjectionTransform || this.treeScale.x !== prevTreeScaleX || this.treeScale.y !== prevTreeScaleY) {
        this.hasProjected = true;
        this.scheduleRender();
        this.notifyListeners("projectionUpdate", target);
      }
      projectionFrameData.recalculatedProjection++;
    }
    hide() {
      this.isVisible = false;
    }
    show() {
      this.isVisible = true;
    }
    scheduleRender(notifyAll = true) {
      this.options.scheduleRender && this.options.scheduleRender();
      if (notifyAll) {
        const stack = this.getStack();
        stack && stack.scheduleRender();
      }
      if (this.resumingFrom && !this.resumingFrom.instance) {
        this.resumingFrom = void 0;
      }
    }
    setAnimationOrigin(delta, hasOnlyRelativeTargetChanged = false) {
      const snapshot = this.snapshot;
      const snapshotLatestValues = snapshot ? snapshot.latestValues : {};
      const mixedValues = { ...this.latestValues };
      const targetDelta = createDelta();
      if (!this.relativeParent || !this.relativeParent.options.layoutRoot) {
        this.relativeTarget = this.relativeTargetOrigin = void 0;
      }
      this.attemptToResolveRelativeTarget = !hasOnlyRelativeTargetChanged;
      const relativeLayout = createBox();
      const snapshotSource = snapshot ? snapshot.source : void 0;
      const layoutSource = this.layout ? this.layout.source : void 0;
      const isSharedLayoutAnimation = snapshotSource !== layoutSource;
      const stack = this.getStack();
      const isOnlyMember = !stack || stack.members.length <= 1;
      const shouldCrossfadeOpacity = Boolean(isSharedLayoutAnimation && !isOnlyMember && this.options.crossfade === true && !this.path.some(hasOpacityCrossfade));
      this.animationProgress = 0;
      let prevRelativeTarget;
      this.mixTargetDelta = (latest) => {
        const progress2 = latest / 1e3;
        mixAxisDelta(targetDelta.x, delta.x, progress2);
        mixAxisDelta(targetDelta.y, delta.y, progress2);
        this.setTargetDelta(targetDelta);
        if (this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout) {
          calcRelativePosition(relativeLayout, this.layout.layoutBox, this.relativeParent.layout.layoutBox);
          mixBox(this.relativeTarget, this.relativeTargetOrigin, relativeLayout, progress2);
          if (prevRelativeTarget && boxEquals(this.relativeTarget, prevRelativeTarget)) {
            this.isProjectionDirty = false;
          }
          if (!prevRelativeTarget)
            prevRelativeTarget = createBox();
          copyBoxInto(prevRelativeTarget, this.relativeTarget);
        }
        if (isSharedLayoutAnimation) {
          this.animationValues = mixedValues;
          mixValues(mixedValues, snapshotLatestValues, this.latestValues, progress2, shouldCrossfadeOpacity, isOnlyMember);
        }
        this.root.scheduleUpdateProjection();
        this.scheduleRender();
        this.animationProgress = progress2;
      };
      this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(options) {
      this.notifyListeners("animationStart");
      this.currentAnimation && this.currentAnimation.stop();
      if (this.resumingFrom && this.resumingFrom.currentAnimation) {
        this.resumingFrom.currentAnimation.stop();
      }
      if (this.pendingAnimation) {
        cancelFrame(this.pendingAnimation);
        this.pendingAnimation = void 0;
      }
      this.pendingAnimation = frame.update(() => {
        globalProjectionState.hasAnimatedSinceResize = true;
        this.currentAnimation = animateSingleValue(0, animationTarget, {
          ...options,
          onUpdate: (latest) => {
            this.mixTargetDelta(latest);
            options.onUpdate && options.onUpdate(latest);
          },
          onComplete: () => {
            options.onComplete && options.onComplete();
            this.completeAnimation();
          }
        });
        if (this.resumingFrom) {
          this.resumingFrom.currentAnimation = this.currentAnimation;
        }
        this.pendingAnimation = void 0;
      });
    }
    completeAnimation() {
      if (this.resumingFrom) {
        this.resumingFrom.currentAnimation = void 0;
        this.resumingFrom.preserveOpacity = void 0;
      }
      const stack = this.getStack();
      stack && stack.exitAnimationComplete();
      this.resumingFrom = this.currentAnimation = this.animationValues = void 0;
      this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      if (this.currentAnimation) {
        this.mixTargetDelta && this.mixTargetDelta(animationTarget);
        this.currentAnimation.stop();
      }
      this.completeAnimation();
    }
    applyTransformsToTarget() {
      const lead = this.getLead();
      let { targetWithTransforms, target, layout: layout3, latestValues } = lead;
      if (!targetWithTransforms || !target || !layout3)
        return;
      if (this !== lead && this.layout && layout3 && shouldAnimatePositionOnly(this.options.animationType, this.layout.layoutBox, layout3.layoutBox)) {
        target = this.target || createBox();
        const xLength = calcLength(this.layout.layoutBox.x);
        target.x.min = lead.target.x.min;
        target.x.max = target.x.min + xLength;
        const yLength = calcLength(this.layout.layoutBox.y);
        target.y.min = lead.target.y.min;
        target.y.max = target.y.min + yLength;
      }
      copyBoxInto(targetWithTransforms, target);
      transformBox(targetWithTransforms, latestValues);
      calcBoxDelta(this.projectionDeltaWithTransform, this.layoutCorrected, targetWithTransforms, latestValues);
    }
    registerSharedNode(layoutId, node) {
      if (!this.sharedNodes.has(layoutId)) {
        this.sharedNodes.set(layoutId, new NodeStack());
      }
      const stack = this.sharedNodes.get(layoutId);
      stack.add(node);
      const config2 = node.options.initialPromotionConfig;
      node.promote({
        transition: config2 ? config2.transition : void 0,
        preserveFollowOpacity: config2 && config2.shouldPreserveFollowOpacity ? config2.shouldPreserveFollowOpacity(node) : void 0
      });
    }
    isLead() {
      const stack = this.getStack();
      return stack ? stack.lead === this : true;
    }
    getLead() {
      var _a7;
      const { layoutId } = this.options;
      return layoutId ? ((_a7 = this.getStack()) === null || _a7 === void 0 ? void 0 : _a7.lead) || this : this;
    }
    getPrevLead() {
      var _a7;
      const { layoutId } = this.options;
      return layoutId ? (_a7 = this.getStack()) === null || _a7 === void 0 ? void 0 : _a7.prevLead : void 0;
    }
    getStack() {
      const { layoutId } = this.options;
      if (layoutId)
        return this.root.sharedNodes.get(layoutId);
    }
    promote({ needsReset, transition: transition3, preserveFollowOpacity } = {}) {
      const stack = this.getStack();
      if (stack)
        stack.promote(this, preserveFollowOpacity);
      if (needsReset) {
        this.projectionDelta = void 0;
        this.needsReset = true;
      }
      if (transition3)
        this.setOptions({ transition: transition3 });
    }
    relegate() {
      const stack = this.getStack();
      if (stack) {
        return stack.relegate(this);
      } else {
        return false;
      }
    }
    resetRotation() {
      const { visualElement } = this.options;
      if (!visualElement)
        return;
      let hasRotate = false;
      const { latestValues } = visualElement;
      if (latestValues.rotate || latestValues.rotateX || latestValues.rotateY || latestValues.rotateZ) {
        hasRotate = true;
      }
      if (!hasRotate)
        return;
      const resetValues = {};
      for (let i = 0; i < transformAxes.length; i++) {
        const key = "rotate" + transformAxes[i];
        if (latestValues[key]) {
          resetValues[key] = latestValues[key];
          visualElement.setStaticValue(key, 0);
        }
      }
      visualElement.render();
      for (const key in resetValues) {
        visualElement.setStaticValue(key, resetValues[key]);
      }
      visualElement.scheduleRender();
    }
    getProjectionStyles(styleProp) {
      var _a7, _b5;
      if (!this.instance || this.isSVG)
        return void 0;
      if (!this.isVisible) {
        return hiddenVisibility;
      }
      const styles2 = {
        visibility: ""
      };
      const transformTemplate2 = this.getTransformTemplate();
      if (this.needsReset) {
        this.needsReset = false;
        styles2.opacity = "";
        styles2.pointerEvents = resolveMotionValue(styleProp === null || styleProp === void 0 ? void 0 : styleProp.pointerEvents) || "";
        styles2.transform = transformTemplate2 ? transformTemplate2(this.latestValues, "") : "none";
        return styles2;
      }
      const lead = this.getLead();
      if (!this.projectionDelta || !this.layout || !lead.target) {
        const emptyStyles = {};
        if (this.options.layoutId) {
          emptyStyles.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1;
          emptyStyles.pointerEvents = resolveMotionValue(styleProp === null || styleProp === void 0 ? void 0 : styleProp.pointerEvents) || "";
        }
        if (this.hasProjected && !hasTransform(this.latestValues)) {
          emptyStyles.transform = transformTemplate2 ? transformTemplate2({}, "") : "none";
          this.hasProjected = false;
        }
        return emptyStyles;
      }
      const valuesToRender = lead.animationValues || lead.latestValues;
      this.applyTransformsToTarget();
      styles2.transform = buildProjectionTransform(this.projectionDeltaWithTransform, this.treeScale, valuesToRender);
      if (transformTemplate2) {
        styles2.transform = transformTemplate2(valuesToRender, styles2.transform);
      }
      const { x, y } = this.projectionDelta;
      styles2.transformOrigin = `${x.origin * 100}% ${y.origin * 100}% 0`;
      if (lead.animationValues) {
        styles2.opacity = lead === this ? (_b5 = (_a7 = valuesToRender.opacity) !== null && _a7 !== void 0 ? _a7 : this.latestValues.opacity) !== null && _b5 !== void 0 ? _b5 : 1 : this.preserveOpacity ? this.latestValues.opacity : valuesToRender.opacityExit;
      } else {
        styles2.opacity = lead === this ? valuesToRender.opacity !== void 0 ? valuesToRender.opacity : "" : valuesToRender.opacityExit !== void 0 ? valuesToRender.opacityExit : 0;
      }
      for (const key in scaleCorrectors) {
        if (valuesToRender[key] === void 0)
          continue;
        const { correct, applyTo } = scaleCorrectors[key];
        const corrected = styles2.transform === "none" ? valuesToRender[key] : correct(valuesToRender[key], lead);
        if (applyTo) {
          const num = applyTo.length;
          for (let i = 0; i < num; i++) {
            styles2[applyTo[i]] = corrected;
          }
        } else {
          styles2[key] = corrected;
        }
      }
      if (this.options.layoutId) {
        styles2.pointerEvents = lead === this ? resolveMotionValue(styleProp === null || styleProp === void 0 ? void 0 : styleProp.pointerEvents) || "" : "none";
      }
      return styles2;
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((node) => {
        var _a7;
        return (_a7 = node.currentAnimation) === null || _a7 === void 0 ? void 0 : _a7.stop();
      });
      this.root.nodes.forEach(clearMeasurements);
      this.root.sharedNodes.clear();
    }
  };
}
function updateLayout(node) {
  node.updateLayout();
}
function notifyLayoutUpdate(node) {
  var _a7;
  const snapshot = ((_a7 = node.resumeFrom) === null || _a7 === void 0 ? void 0 : _a7.snapshot) || node.snapshot;
  if (node.isLead() && node.layout && snapshot && node.hasListeners("didUpdate")) {
    const { layoutBox: layout3, measuredBox: measuredLayout } = node.layout;
    const { animationType } = node.options;
    const isShared = snapshot.source !== node.layout.source;
    if (animationType === "size") {
      eachAxis((axis) => {
        const axisSnapshot = isShared ? snapshot.measuredBox[axis] : snapshot.layoutBox[axis];
        const length = calcLength(axisSnapshot);
        axisSnapshot.min = layout3[axis].min;
        axisSnapshot.max = axisSnapshot.min + length;
      });
    } else if (shouldAnimatePositionOnly(animationType, snapshot.layoutBox, layout3)) {
      eachAxis((axis) => {
        const axisSnapshot = isShared ? snapshot.measuredBox[axis] : snapshot.layoutBox[axis];
        const length = calcLength(layout3[axis]);
        axisSnapshot.max = axisSnapshot.min + length;
        if (node.relativeTarget && !node.currentAnimation) {
          node.isProjectionDirty = true;
          node.relativeTarget[axis].max = node.relativeTarget[axis].min + length;
        }
      });
    }
    const layoutDelta = createDelta();
    calcBoxDelta(layoutDelta, layout3, snapshot.layoutBox);
    const visualDelta = createDelta();
    if (isShared) {
      calcBoxDelta(visualDelta, node.applyTransform(measuredLayout, true), snapshot.measuredBox);
    } else {
      calcBoxDelta(visualDelta, layout3, snapshot.layoutBox);
    }
    const hasLayoutChanged = !isDeltaZero(layoutDelta);
    let hasRelativeTargetChanged = false;
    if (!node.resumeFrom) {
      const relativeParent = node.getClosestProjectingParent();
      if (relativeParent && !relativeParent.resumeFrom) {
        const { snapshot: parentSnapshot, layout: parentLayout } = relativeParent;
        if (parentSnapshot && parentLayout) {
          const relativeSnapshot = createBox();
          calcRelativePosition(relativeSnapshot, snapshot.layoutBox, parentSnapshot.layoutBox);
          const relativeLayout = createBox();
          calcRelativePosition(relativeLayout, layout3, parentLayout.layoutBox);
          if (!boxEqualsRounded(relativeSnapshot, relativeLayout)) {
            hasRelativeTargetChanged = true;
          }
          if (relativeParent.options.layoutRoot) {
            node.relativeTarget = relativeLayout;
            node.relativeTargetOrigin = relativeSnapshot;
            node.relativeParent = relativeParent;
          }
        }
      }
    }
    node.notifyListeners("didUpdate", {
      layout: layout3,
      snapshot,
      delta: visualDelta,
      layoutDelta,
      hasLayoutChanged,
      hasRelativeTargetChanged
    });
  } else if (node.isLead()) {
    const { onExitComplete } = node.options;
    onExitComplete && onExitComplete();
  }
  node.options.transition = void 0;
}
function propagateDirtyNodes(node) {
  projectionFrameData.totalNodes++;
  if (!node.parent)
    return;
  if (!node.isProjecting()) {
    node.isProjectionDirty = node.parent.isProjectionDirty;
  }
  node.isSharedProjectionDirty || (node.isSharedProjectionDirty = Boolean(node.isProjectionDirty || node.parent.isProjectionDirty || node.parent.isSharedProjectionDirty));
  node.isTransformDirty || (node.isTransformDirty = node.parent.isTransformDirty);
}
function cleanDirtyNodes(node) {
  node.isProjectionDirty = node.isSharedProjectionDirty = node.isTransformDirty = false;
}
function clearSnapshot(node) {
  node.clearSnapshot();
}
function clearMeasurements(node) {
  node.clearMeasurements();
}
function clearIsLayoutDirty(node) {
  node.isLayoutDirty = false;
}
function resetTransformStyle(node) {
  const { visualElement } = node.options;
  if (visualElement && visualElement.getProps().onBeforeLayoutMeasure) {
    visualElement.notify("BeforeLayoutMeasure");
  }
  node.resetTransform();
}
function finishAnimation(node) {
  node.finishAnimation();
  node.targetDelta = node.relativeTarget = node.target = void 0;
  node.isProjectionDirty = true;
}
function resolveTargetDelta(node) {
  node.resolveTargetDelta();
}
function calcProjection(node) {
  node.calcProjection();
}
function resetRotation(node) {
  node.resetRotation();
}
function removeLeadSnapshots(stack) {
  stack.removeLeadSnapshot();
}
function mixAxisDelta(output, delta, p) {
  output.translate = mixNumber(delta.translate, 0, p);
  output.scale = mixNumber(delta.scale, 1, p);
  output.origin = delta.origin;
  output.originPoint = delta.originPoint;
}
function mixAxis(output, from, to, p) {
  output.min = mixNumber(from.min, to.min, p);
  output.max = mixNumber(from.max, to.max, p);
}
function mixBox(output, from, to, p) {
  mixAxis(output.x, from.x, to.x, p);
  mixAxis(output.y, from.y, to.y, p);
}
function hasOpacityCrossfade(node) {
  return node.animationValues && node.animationValues.opacityExit !== void 0;
}
var defaultLayoutTransition = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
};
var userAgentContains = (string) => typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(string);
var roundPoint = userAgentContains("applewebkit/") && !userAgentContains("chrome/") ? Math.round : noop3;
function roundAxis(axis) {
  axis.min = roundPoint(axis.min);
  axis.max = roundPoint(axis.max);
}
function roundBox(box) {
  roundAxis(box.x);
  roundAxis(box.y);
}
function shouldAnimatePositionOnly(animationType, snapshot, layout3) {
  return animationType === "position" || animationType === "preserve-aspect" && !isNear(aspectRatio(snapshot), aspectRatio(layout3), 0.2);
}

// node_modules/framer-motion/dist/es/projection/node/DocumentProjectionNode.mjs
var DocumentProjectionNode = createProjectionNode({
  attachResizeListener: (ref, notify) => addDomEvent(ref, "resize", notify),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body.scrollLeft,
    y: document.documentElement.scrollTop || document.body.scrollTop
  }),
  checkIsScrollRoot: () => true
});

// node_modules/framer-motion/dist/es/projection/node/HTMLProjectionNode.mjs
var rootProjectionNode = {
  current: void 0
};
var HTMLProjectionNode = createProjectionNode({
  measureScroll: (instance) => ({
    x: instance.scrollLeft,
    y: instance.scrollTop
  }),
  defaultParent: () => {
    if (!rootProjectionNode.current) {
      const documentNode = new DocumentProjectionNode({});
      documentNode.mount(window);
      documentNode.setOptions({ layoutScroll: true });
      rootProjectionNode.current = documentNode;
    }
    return rootProjectionNode.current;
  },
  resetTransform: (instance, value) => {
    instance.style.transform = value !== void 0 ? value : "none";
  },
  checkIsScrollRoot: (instance) => Boolean(window.getComputedStyle(instance).position === "fixed")
});

// node_modules/framer-motion/dist/es/motion/features/drag.mjs
var drag = {
  pan: {
    Feature: PanGesture
  },
  drag: {
    Feature: DragGesture,
    ProjectionNode: HTMLProjectionNode,
    MeasureLayout
  }
};

// node_modules/framer-motion/dist/es/render/dom/utils/css-variables-conversion.mjs
var splitCSSVariableRegex = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;
function parseCSSVariable(current) {
  const match = splitCSSVariableRegex.exec(current);
  if (!match)
    return [,];
  const [, token, fallback] = match;
  return [token, fallback];
}
var maxDepth = 4;
function getVariableValue(current, element, depth = 1) {
  invariant(depth <= maxDepth, `Max CSS variable fallback depth detected in property "${current}". This may indicate a circular fallback dependency.`);
  const [token, fallback] = parseCSSVariable(current);
  if (!token)
    return;
  const resolved = window.getComputedStyle(element).getPropertyValue(token);
  if (resolved) {
    const trimmed = resolved.trim();
    return isNumericalString(trimmed) ? parseFloat(trimmed) : trimmed;
  } else if (isCSSVariableToken(fallback)) {
    return getVariableValue(fallback, element, depth + 1);
  } else {
    return fallback;
  }
}
function resolveCSSVariables(visualElement, { ...target }, transitionEnd) {
  const element = visualElement.current;
  if (!(element instanceof Element))
    return { target, transitionEnd };
  if (transitionEnd) {
    transitionEnd = { ...transitionEnd };
  }
  visualElement.values.forEach((value) => {
    const current = value.get();
    if (!isCSSVariableToken(current))
      return;
    const resolved = getVariableValue(current, element);
    if (resolved)
      value.set(resolved);
  });
  for (const key in target) {
    const current = target[key];
    if (!isCSSVariableToken(current))
      continue;
    const resolved = getVariableValue(current, element);
    if (!resolved)
      continue;
    target[key] = resolved;
    if (!transitionEnd)
      transitionEnd = {};
    if (transitionEnd[key] === void 0) {
      transitionEnd[key] = current;
    }
  }
  return { target, transitionEnd };
}

// node_modules/framer-motion/dist/es/render/dom/utils/unit-conversion.mjs
var positionalKeys = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  "x",
  "y",
  "translateX",
  "translateY"
]);
var isPositionalKey = (key) => positionalKeys.has(key);
var hasPositionalKey = (target) => {
  return Object.keys(target).some(isPositionalKey);
};
var isNumOrPxType = (v) => v === number || v === px2;
var getPosFromMatrix = (matrix, pos) => parseFloat(matrix.split(", ")[pos]);
var getTranslateFromMatrix = (pos2, pos3) => (_bbox, { transform: transform2 }) => {
  if (transform2 === "none" || !transform2)
    return 0;
  const matrix3d = transform2.match(/^matrix3d\((.+)\)$/);
  if (matrix3d) {
    return getPosFromMatrix(matrix3d[1], pos3);
  } else {
    const matrix = transform2.match(/^matrix\((.+)\)$/);
    if (matrix) {
      return getPosFromMatrix(matrix[1], pos2);
    } else {
      return 0;
    }
  }
};
var transformKeys = /* @__PURE__ */ new Set(["x", "y", "z"]);
var nonTranslationalTransformKeys = transformPropOrder.filter((key) => !transformKeys.has(key));
function removeNonTranslationalTransform(visualElement) {
  const removedTransforms = [];
  nonTranslationalTransformKeys.forEach((key) => {
    const value = visualElement.getValue(key);
    if (value !== void 0) {
      removedTransforms.push([key, value.get()]);
      value.set(key.startsWith("scale") ? 1 : 0);
    }
  });
  if (removedTransforms.length)
    visualElement.render();
  return removedTransforms;
}
var positionalValues = {
  // Dimensions
  width: ({ x }, { paddingLeft = "0", paddingRight = "0" }) => x.max - x.min - parseFloat(paddingLeft) - parseFloat(paddingRight),
  height: ({ y }, { paddingTop = "0", paddingBottom = "0" }) => y.max - y.min - parseFloat(paddingTop) - parseFloat(paddingBottom),
  top: (_bbox, { top: top2 }) => parseFloat(top2),
  left: (_bbox, { left: left2 }) => parseFloat(left2),
  bottom: ({ y }, { top: top2 }) => parseFloat(top2) + (y.max - y.min),
  right: ({ x }, { left: left2 }) => parseFloat(left2) + (x.max - x.min),
  // Transform
  x: getTranslateFromMatrix(4, 13),
  y: getTranslateFromMatrix(5, 14)
};
positionalValues.translateX = positionalValues.x;
positionalValues.translateY = positionalValues.y;
var convertChangedValueTypes = (target, visualElement, changedKeys) => {
  const originBbox = visualElement.measureViewportBox();
  const element = visualElement.current;
  const elementComputedStyle = getComputedStyle(element);
  const { display } = elementComputedStyle;
  const origin = {};
  if (display === "none") {
    visualElement.setStaticValue("display", target.display || "block");
  }
  changedKeys.forEach((key) => {
    origin[key] = positionalValues[key](originBbox, elementComputedStyle);
  });
  visualElement.render();
  const targetBbox = visualElement.measureViewportBox();
  changedKeys.forEach((key) => {
    const value = visualElement.getValue(key);
    value && value.jump(origin[key]);
    target[key] = positionalValues[key](targetBbox, elementComputedStyle);
  });
  return target;
};
var checkAndConvertChangedValueTypes = (visualElement, target, origin = {}, transitionEnd = {}) => {
  target = { ...target };
  transitionEnd = { ...transitionEnd };
  const targetPositionalKeys = Object.keys(target).filter(isPositionalKey);
  let removedTransformValues = [];
  let hasAttemptedToRemoveTransformValues = false;
  const changedValueTypeKeys = [];
  targetPositionalKeys.forEach((key) => {
    const value = visualElement.getValue(key);
    if (!visualElement.hasValue(key))
      return;
    let from = origin[key];
    let fromType = findDimensionValueType(from);
    const to = target[key];
    let toType;
    if (isKeyframesTarget(to)) {
      const numKeyframes = to.length;
      const fromIndex = to[0] === null ? 1 : 0;
      from = to[fromIndex];
      fromType = findDimensionValueType(from);
      for (let i = fromIndex; i < numKeyframes; i++) {
        if (to[i] === null)
          break;
        if (!toType) {
          toType = findDimensionValueType(to[i]);
          invariant(toType === fromType || isNumOrPxType(fromType) && isNumOrPxType(toType), "Keyframes must be of the same dimension as the current value");
        } else {
          invariant(findDimensionValueType(to[i]) === toType, "All keyframes must be of the same type");
        }
      }
    } else {
      toType = findDimensionValueType(to);
    }
    if (fromType !== toType) {
      if (isNumOrPxType(fromType) && isNumOrPxType(toType)) {
        const current = value.get();
        if (typeof current === "string") {
          value.set(parseFloat(current));
        }
        if (typeof to === "string") {
          target[key] = parseFloat(to);
        } else if (Array.isArray(to) && toType === px2) {
          target[key] = to.map(parseFloat);
        }
      } else if ((fromType === null || fromType === void 0 ? void 0 : fromType.transform) && (toType === null || toType === void 0 ? void 0 : toType.transform) && (from === 0 || to === 0)) {
        if (from === 0) {
          value.set(toType.transform(from));
        } else {
          target[key] = fromType.transform(to);
        }
      } else {
        if (!hasAttemptedToRemoveTransformValues) {
          removedTransformValues = removeNonTranslationalTransform(visualElement);
          hasAttemptedToRemoveTransformValues = true;
        }
        changedValueTypeKeys.push(key);
        transitionEnd[key] = transitionEnd[key] !== void 0 ? transitionEnd[key] : target[key];
        value.jump(to);
      }
    }
  });
  if (changedValueTypeKeys.length) {
    const scrollY = changedValueTypeKeys.indexOf("height") >= 0 ? window.pageYOffset : null;
    const convertedTarget = convertChangedValueTypes(target, visualElement, changedValueTypeKeys);
    if (removedTransformValues.length) {
      removedTransformValues.forEach(([key, value]) => {
        visualElement.getValue(key).set(value);
      });
    }
    visualElement.render();
    if (isBrowser && scrollY !== null) {
      window.scrollTo({ top: scrollY });
    }
    return { target: convertedTarget, transitionEnd };
  } else {
    return { target, transitionEnd };
  }
};
function unitConversion(visualElement, target, origin, transitionEnd) {
  return hasPositionalKey(target) ? checkAndConvertChangedValueTypes(visualElement, target, origin, transitionEnd) : { target, transitionEnd };
}

// node_modules/framer-motion/dist/es/render/dom/utils/parse-dom-variant.mjs
var parseDomVariant = (visualElement, target, origin, transitionEnd) => {
  const resolved = resolveCSSVariables(visualElement, target, transitionEnd);
  target = resolved.target;
  transitionEnd = resolved.transitionEnd;
  return unitConversion(visualElement, target, origin, transitionEnd);
};

// node_modules/framer-motion/dist/es/utils/reduced-motion/state.mjs
var prefersReducedMotion = { current: null };
var hasReducedMotionListener = { current: false };

// node_modules/framer-motion/dist/es/utils/reduced-motion/index.mjs
function initPrefersReducedMotion() {
  hasReducedMotionListener.current = true;
  if (!isBrowser)
    return;
  if (window.matchMedia) {
    const motionMediaQuery = window.matchMedia("(prefers-reduced-motion)");
    const setReducedMotionPreferences = () => prefersReducedMotion.current = motionMediaQuery.matches;
    motionMediaQuery.addListener(setReducedMotionPreferences);
    setReducedMotionPreferences();
  } else {
    prefersReducedMotion.current = false;
  }
}

// node_modules/framer-motion/dist/es/render/utils/motion-values.mjs
function updateMotionValuesFromProps(element, next, prev) {
  const { willChange } = next;
  for (const key in next) {
    const nextValue = next[key];
    const prevValue = prev[key];
    if (isMotionValue(nextValue)) {
      element.addValue(key, nextValue);
      if (isWillChangeMotionValue(willChange)) {
        willChange.add(key);
      }
      if (true) {
        warnOnce(nextValue.version === "11.0.8", `Attempting to mix Framer Motion versions ${nextValue.version} with 11.0.8 may not work as expected.`);
      }
    } else if (isMotionValue(prevValue)) {
      element.addValue(key, motionValue(nextValue, { owner: element }));
      if (isWillChangeMotionValue(willChange)) {
        willChange.remove(key);
      }
    } else if (prevValue !== nextValue) {
      if (element.hasValue(key)) {
        const existingValue = element.getValue(key);
        !existingValue.hasAnimated && existingValue.set(nextValue);
      } else {
        const latestValue = element.getStaticValue(key);
        element.addValue(key, motionValue(latestValue !== void 0 ? latestValue : nextValue, { owner: element }));
      }
    }
  }
  for (const key in prev) {
    if (next[key] === void 0)
      element.removeValue(key);
  }
  return next;
}

// node_modules/framer-motion/dist/es/render/store.mjs
var visualElementStore = /* @__PURE__ */ new WeakMap();

// node_modules/framer-motion/dist/es/render/VisualElement.mjs
var featureNames = Object.keys(featureDefinitions);
var numFeatures = featureNames.length;
var propEventHandlers = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
var numVariantProps = variantProps.length;
var VisualElement = class {
  constructor({ parent, props, presenceContext, reducedMotionConfig, visualState }, options = {}) {
    this.current = null;
    this.children = /* @__PURE__ */ new Set();
    this.isVariantNode = false;
    this.isControllingVariants = false;
    this.shouldReduceMotion = null;
    this.values = /* @__PURE__ */ new Map();
    this.features = {};
    this.valueSubscriptions = /* @__PURE__ */ new Map();
    this.prevMotionValues = {};
    this.events = {};
    this.propEventSubscriptions = {};
    this.notifyUpdate = () => this.notify("Update", this.latestValues);
    this.render = () => {
      if (!this.current)
        return;
      this.triggerBuild();
      this.renderInstance(this.current, this.renderState, this.props.style, this.projection);
    };
    this.scheduleRender = () => frame.render(this.render, false, true);
    const { latestValues, renderState } = visualState;
    this.latestValues = latestValues;
    this.baseTarget = { ...latestValues };
    this.initialValues = props.initial ? { ...latestValues } : {};
    this.renderState = renderState;
    this.parent = parent;
    this.props = props;
    this.presenceContext = presenceContext;
    this.depth = parent ? parent.depth + 1 : 0;
    this.reducedMotionConfig = reducedMotionConfig;
    this.options = options;
    this.isControllingVariants = isControllingVariants(props);
    this.isVariantNode = isVariantNode(props);
    if (this.isVariantNode) {
      this.variantChildren = /* @__PURE__ */ new Set();
    }
    this.manuallyAnimateOnMount = Boolean(parent && parent.current);
    const { willChange, ...initialMotionValues } = this.scrapeMotionValuesFromProps(props, {});
    for (const key in initialMotionValues) {
      const value = initialMotionValues[key];
      if (latestValues[key] !== void 0 && isMotionValue(value)) {
        value.set(latestValues[key], false);
        if (isWillChangeMotionValue(willChange)) {
          willChange.add(key);
        }
      }
    }
  }
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(_props, _prevProps) {
    return {};
  }
  mount(instance) {
    this.current = instance;
    visualElementStore.set(instance, this);
    if (this.projection && !this.projection.instance) {
      this.projection.mount(instance);
    }
    if (this.parent && this.isVariantNode && !this.isControllingVariants) {
      this.removeFromVariantTree = this.parent.addVariantChild(this);
    }
    this.values.forEach((value, key) => this.bindToMotionValue(key, value));
    if (!hasReducedMotionListener.current) {
      initPrefersReducedMotion();
    }
    this.shouldReduceMotion = this.reducedMotionConfig === "never" ? false : this.reducedMotionConfig === "always" ? true : prefersReducedMotion.current;
    if (true) {
      warnOnce(this.shouldReduceMotion !== true, "You have Reduced Motion enabled on your device. Animations may not appear as expected.");
    }
    if (this.parent)
      this.parent.children.add(this);
    this.update(this.props, this.presenceContext);
  }
  unmount() {
    visualElementStore.delete(this.current);
    this.projection && this.projection.unmount();
    cancelFrame(this.notifyUpdate);
    cancelFrame(this.render);
    this.valueSubscriptions.forEach((remove) => remove());
    this.removeFromVariantTree && this.removeFromVariantTree();
    this.parent && this.parent.children.delete(this);
    for (const key in this.events) {
      this.events[key].clear();
    }
    for (const key in this.features) {
      this.features[key].unmount();
    }
    this.current = null;
  }
  bindToMotionValue(key, value) {
    const valueIsTransform = transformProps.has(key);
    const removeOnChange = value.on("change", (latestValue) => {
      this.latestValues[key] = latestValue;
      this.props.onUpdate && frame.update(this.notifyUpdate, false, true);
      if (valueIsTransform && this.projection) {
        this.projection.isTransformDirty = true;
      }
    });
    const removeOnRenderRequest = value.on("renderRequest", this.scheduleRender);
    this.valueSubscriptions.set(key, () => {
      removeOnChange();
      removeOnRenderRequest();
    });
  }
  sortNodePosition(other) {
    if (!this.current || !this.sortInstanceNodePosition || this.type !== other.type) {
      return 0;
    }
    return this.sortInstanceNodePosition(this.current, other.current);
  }
  loadFeatures({ children, ...renderedProps }, isStrict, preloadedFeatures2, initialLayoutGroupConfig) {
    let ProjectionNodeConstructor;
    let MeasureLayout2;
    if (preloadedFeatures2 && isStrict) {
      const strictMessage = "You have rendered a `motion` component within a `LazyMotion` component. This will break tree shaking. Import and render a `m` component instead.";
      renderedProps.ignoreStrict ? warning(false, strictMessage) : invariant(false, strictMessage);
    }
    for (let i = 0; i < numFeatures; i++) {
      const name = featureNames[i];
      const { isEnabled, Feature: FeatureConstructor, ProjectionNode, MeasureLayout: MeasureLayoutComponent } = featureDefinitions[name];
      if (ProjectionNode)
        ProjectionNodeConstructor = ProjectionNode;
      if (isEnabled(renderedProps)) {
        if (!this.features[name] && FeatureConstructor) {
          this.features[name] = new FeatureConstructor(this);
        }
        if (MeasureLayoutComponent) {
          MeasureLayout2 = MeasureLayoutComponent;
        }
      }
    }
    if ((this.type === "html" || this.type === "svg") && !this.projection && ProjectionNodeConstructor) {
      this.projection = new ProjectionNodeConstructor(this.latestValues, this.parent && this.parent.projection);
      const { layoutId, layout: layout3, drag: drag2, dragConstraints, layoutScroll, layoutRoot } = renderedProps;
      this.projection.setOptions({
        layoutId,
        layout: layout3,
        alwaysMeasureLayout: Boolean(drag2) || dragConstraints && isRefObject(dragConstraints),
        visualElement: this,
        scheduleRender: () => this.scheduleRender(),
        /**
         * TODO: Update options in an effect. This could be tricky as it'll be too late
         * to update by the time layout animations run.
         * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
         * ensuring it gets called if there's no potential layout animations.
         *
         */
        animationType: typeof layout3 === "string" ? layout3 : "both",
        initialPromotionConfig: initialLayoutGroupConfig,
        layoutScroll,
        layoutRoot
      });
    }
    return MeasureLayout2;
  }
  updateFeatures() {
    for (const key in this.features) {
      const feature = this.features[key];
      if (feature.isMounted) {
        feature.update();
      } else {
        feature.mount();
        feature.isMounted = true;
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.options, this.props);
  }
  /**
   * Measure the current viewport box with or without transforms.
   * Only measures axis-aligned boxes, rotate and skew must be manually
   * removed with a re-render to work.
   */
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : createBox();
  }
  getStaticValue(key) {
    return this.latestValues[key];
  }
  setStaticValue(key, value) {
    this.latestValues[key] = value;
  }
  /**
   * Make a target animatable by Popmotion. For instance, if we're
   * trying to animate width from 100px to 100vw we need to measure 100vw
   * in pixels to determine what we really need to animate to. This is also
   * pluggable to support Framer's custom value types like Color,
   * and CSS variables.
   */
  makeTargetAnimatable(target, canMutate = true) {
    return this.makeTargetAnimatableFromInstance(target, canMutate);
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(props, presenceContext) {
    if (props.transformTemplate || this.props.transformTemplate) {
      this.scheduleRender();
    }
    this.prevProps = this.props;
    this.props = props;
    this.prevPresenceContext = this.presenceContext;
    this.presenceContext = presenceContext;
    for (let i = 0; i < propEventHandlers.length; i++) {
      const key = propEventHandlers[i];
      if (this.propEventSubscriptions[key]) {
        this.propEventSubscriptions[key]();
        delete this.propEventSubscriptions[key];
      }
      const listener = props["on" + key];
      if (listener) {
        this.propEventSubscriptions[key] = this.on(key, listener);
      }
    }
    this.prevMotionValues = updateMotionValuesFromProps(this, this.scrapeMotionValuesFromProps(props, this.prevProps), this.prevMotionValues);
    if (this.handleChildMotionValue) {
      this.handleChildMotionValue();
    }
  }
  getProps() {
    return this.props;
  }
  /**
   * Returns the variant definition with a given name.
   */
  getVariant(name) {
    return this.props.variants ? this.props.variants[name] : void 0;
  }
  /**
   * Returns the defined default transition on this component.
   */
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
  }
  getVariantContext(startAtParent = false) {
    if (startAtParent) {
      return this.parent ? this.parent.getVariantContext() : void 0;
    }
    if (!this.isControllingVariants) {
      const context2 = this.parent ? this.parent.getVariantContext() || {} : {};
      if (this.props.initial !== void 0) {
        context2.initial = this.props.initial;
      }
      return context2;
    }
    const context = {};
    for (let i = 0; i < numVariantProps; i++) {
      const name = variantProps[i];
      const prop = this.props[name];
      if (isVariantLabel(prop) || prop === false) {
        context[name] = prop;
      }
    }
    return context;
  }
  /**
   * Add a child visual element to our set of children.
   */
  addVariantChild(child) {
    const closestVariantNode = this.getClosestVariantNode();
    if (closestVariantNode) {
      closestVariantNode.variantChildren && closestVariantNode.variantChildren.add(child);
      return () => closestVariantNode.variantChildren.delete(child);
    }
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(key, value) {
    if (value !== this.values.get(key)) {
      this.removeValue(key);
      this.bindToMotionValue(key, value);
    }
    this.values.set(key, value);
    this.latestValues[key] = value.get();
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(key) {
    this.values.delete(key);
    const unsubscribe = this.valueSubscriptions.get(key);
    if (unsubscribe) {
      unsubscribe();
      this.valueSubscriptions.delete(key);
    }
    delete this.latestValues[key];
    this.removeValueFromRenderState(key, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(key) {
    return this.values.has(key);
  }
  getValue(key, defaultValue) {
    if (this.props.values && this.props.values[key]) {
      return this.props.values[key];
    }
    let value = this.values.get(key);
    if (value === void 0 && defaultValue !== void 0) {
      value = motionValue(defaultValue, { owner: this });
      this.addValue(key, value);
    }
    return value;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(key) {
    var _a7;
    return this.latestValues[key] !== void 0 || !this.current ? this.latestValues[key] : (_a7 = this.getBaseTargetFromProps(this.props, key)) !== null && _a7 !== void 0 ? _a7 : this.readValueFromInstance(this.current, key, this.options);
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(key, value) {
    this.baseTarget[key] = value;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(key) {
    var _a7;
    const { initial } = this.props;
    const valueFromInitial = typeof initial === "string" || typeof initial === "object" ? (_a7 = resolveVariantFromProps(this.props, initial)) === null || _a7 === void 0 ? void 0 : _a7[key] : void 0;
    if (initial && valueFromInitial !== void 0) {
      return valueFromInitial;
    }
    const target = this.getBaseTargetFromProps(this.props, key);
    if (target !== void 0 && !isMotionValue(target))
      return target;
    return this.initialValues[key] !== void 0 && valueFromInitial === void 0 ? void 0 : this.baseTarget[key];
  }
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = new SubscriptionManager();
    }
    return this.events[eventName].add(callback);
  }
  notify(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].notify(...args);
    }
  }
};

// node_modules/framer-motion/dist/es/render/dom/DOMVisualElement.mjs
var DOMVisualElement = class extends VisualElement {
  sortInstanceNodePosition(a, b) {
    return a.compareDocumentPosition(b) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(props, key) {
    return props.style ? props.style[key] : void 0;
  }
  removeValueFromRenderState(key, { vars: vars2, style }) {
    delete vars2[key];
    delete style[key];
  }
  makeTargetAnimatableFromInstance({ transition: transition3, transitionEnd, ...target }, isMounted) {
    const origin = getOrigin(target, transition3 || {}, this);
    if (isMounted) {
      checkTargetForNewValues(this, target, origin);
      const parsed = parseDomVariant(this, target, origin, transitionEnd);
      transitionEnd = parsed.transitionEnd;
      target = parsed.target;
    }
    return {
      transition: transition3,
      transitionEnd,
      ...target
    };
  }
};

// node_modules/framer-motion/dist/es/render/html/HTMLVisualElement.mjs
function getComputedStyle2(element) {
  return window.getComputedStyle(element);
}
var HTMLVisualElement = class extends DOMVisualElement {
  constructor() {
    super(...arguments);
    this.type = "html";
  }
  readValueFromInstance(instance, key) {
    if (transformProps.has(key)) {
      const defaultType = getDefaultValueType(key);
      return defaultType ? defaultType.default || 0 : 0;
    } else {
      const computedStyle = getComputedStyle2(instance);
      const value = (isCSSVariableName(key) ? computedStyle.getPropertyValue(key) : computedStyle[key]) || 0;
      return typeof value === "string" ? value.trim() : value;
    }
  }
  measureInstanceViewportBox(instance, { transformPagePoint }) {
    return measureViewportBox(instance, transformPagePoint);
  }
  build(renderState, latestValues, options, props) {
    buildHTMLStyles(renderState, latestValues, options, props.transformTemplate);
  }
  scrapeMotionValuesFromProps(props, prevProps) {
    return scrapeMotionValuesFromProps(props, prevProps);
  }
  handleChildMotionValue() {
    if (this.childSubscription) {
      this.childSubscription();
      delete this.childSubscription;
    }
    const { children } = this.props;
    if (isMotionValue(children)) {
      this.childSubscription = children.on("change", (latest) => {
        if (this.current)
          this.current.textContent = `${latest}`;
      });
    }
  }
  renderInstance(instance, renderState, styleProp, projection) {
    renderHTML(instance, renderState, styleProp, projection);
  }
};

// node_modules/framer-motion/dist/es/render/svg/SVGVisualElement.mjs
var SVGVisualElement = class extends DOMVisualElement {
  constructor() {
    super(...arguments);
    this.type = "svg";
    this.isSVGTag = false;
  }
  getBaseTargetFromProps(props, key) {
    return props[key];
  }
  readValueFromInstance(instance, key) {
    if (transformProps.has(key)) {
      const defaultType = getDefaultValueType(key);
      return defaultType ? defaultType.default || 0 : 0;
    }
    key = !camelCaseAttributes.has(key) ? camelToDash(key) : key;
    return instance.getAttribute(key);
  }
  measureInstanceViewportBox() {
    return createBox();
  }
  scrapeMotionValuesFromProps(props, prevProps) {
    return scrapeMotionValuesFromProps2(props, prevProps);
  }
  build(renderState, latestValues, options, props) {
    buildSVGAttrs(renderState, latestValues, options, this.isSVGTag, props.transformTemplate);
  }
  renderInstance(instance, renderState, styleProp, projection) {
    renderSVG(instance, renderState, styleProp, projection);
  }
  mount(instance) {
    this.isSVGTag = isSVGTag(instance.tagName);
    super.mount(instance);
  }
};

// node_modules/framer-motion/dist/es/render/dom/create-visual-element.mjs
var createDomVisualElement = (Component2, options) => {
  return isSVGComponent(Component2) ? new SVGVisualElement(options, { enableHardwareAcceleration: false }) : new HTMLVisualElement(options, { enableHardwareAcceleration: true });
};

// node_modules/framer-motion/dist/es/motion/features/layout.mjs
var layout2 = {
  layout: {
    ProjectionNode: HTMLProjectionNode,
    MeasureLayout
  }
};

// node_modules/framer-motion/dist/es/render/dom/motion.mjs
var preloadedFeatures = {
  ...animations,
  ...gestureAnimations,
  ...drag,
  ...layout2
};
var motion = /* @__PURE__ */ createMotionProxy((Component2, config2) => createDomMotionConfig(Component2, config2, preloadedFeatures, createDomVisualElement));

// node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs
var React6 = __toESM(require_react(), 1);
var import_react45 = __toESM(require_react(), 1);

// node_modules/framer-motion/dist/es/utils/use-force-update.mjs
var import_react41 = __toESM(require_react(), 1);

// node_modules/framer-motion/dist/es/utils/use-is-mounted.mjs
var import_react40 = __toESM(require_react(), 1);
function useIsMounted() {
  const isMounted = (0, import_react40.useRef)(false);
  useIsomorphicLayoutEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  return isMounted;
}

// node_modules/framer-motion/dist/es/utils/use-force-update.mjs
function useForceUpdate() {
  const isMounted = useIsMounted();
  const [forcedRenderCount, setForcedRenderCount] = (0, import_react41.useState)(0);
  const forceRender = (0, import_react41.useCallback)(() => {
    isMounted.current && setForcedRenderCount(forcedRenderCount + 1);
  }, [forcedRenderCount]);
  const deferredForceRender = (0, import_react41.useCallback)(() => frame.postRender(forceRender), [forceRender]);
  return [deferredForceRender, forcedRenderCount];
}

// node_modules/framer-motion/dist/es/components/AnimatePresence/PresenceChild.mjs
var React5 = __toESM(require_react(), 1);
var import_react43 = __toESM(require_react(), 1);

// node_modules/framer-motion/dist/es/components/AnimatePresence/PopChild.mjs
var React4 = __toESM(require_react(), 1);
var import_react42 = __toESM(require_react(), 1);
var PopChildMeasure = class extends React4.Component {
  getSnapshotBeforeUpdate(prevProps) {
    const element = this.props.childRef.current;
    if (element && prevProps.isPresent && !this.props.isPresent) {
      const size2 = this.props.sizeRef.current;
      size2.height = element.offsetHeight || 0;
      size2.width = element.offsetWidth || 0;
      size2.top = element.offsetTop;
      size2.left = element.offsetLeft;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
};
function PopChild({ children, isPresent: isPresent2 }) {
  const id3 = (0, import_react42.useId)();
  const ref = (0, import_react42.useRef)(null);
  const size2 = (0, import_react42.useRef)({
    width: 0,
    height: 0,
    top: 0,
    left: 0
  });
  (0, import_react42.useInsertionEffect)(() => {
    const { width, height, top: top2, left: left2 } = size2.current;
    if (isPresent2 || !ref.current || !width || !height)
      return;
    ref.current.dataset.motionPopId = id3;
    const style = document.createElement("style");
    document.head.appendChild(style);
    if (style.sheet) {
      style.sheet.insertRule(`
          [data-motion-pop-id="${id3}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            top: ${top2}px !important;
            left: ${left2}px !important;
          }
        `);
    }
    return () => {
      document.head.removeChild(style);
    };
  }, [isPresent2]);
  return React4.createElement(PopChildMeasure, { isPresent: isPresent2, childRef: ref, sizeRef: size2 }, React4.cloneElement(children, { ref }));
}

// node_modules/framer-motion/dist/es/components/AnimatePresence/PresenceChild.mjs
var PresenceChild = ({ children, initial, isPresent: isPresent2, onExitComplete, custom, presenceAffectsLayout, mode: mode2 }) => {
  const presenceChildren = useConstant(newChildrenMap);
  const id3 = (0, import_react43.useId)();
  const context = (0, import_react43.useMemo)(
    () => ({
      id: id3,
      initial,
      isPresent: isPresent2,
      custom,
      onExitComplete: (childId) => {
        presenceChildren.set(childId, true);
        for (const isComplete of presenceChildren.values()) {
          if (!isComplete)
            return;
        }
        onExitComplete && onExitComplete();
      },
      register: (childId) => {
        presenceChildren.set(childId, false);
        return () => presenceChildren.delete(childId);
      }
    }),
    /**
     * If the presence of a child affects the layout of the components around it,
     * we want to make a new context value to ensure they get re-rendered
     * so they can detect that layout change.
     */
    presenceAffectsLayout ? void 0 : [isPresent2]
  );
  (0, import_react43.useMemo)(() => {
    presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
  }, [isPresent2]);
  React5.useEffect(() => {
    !isPresent2 && !presenceChildren.size && onExitComplete && onExitComplete();
  }, [isPresent2]);
  if (mode2 === "popLayout") {
    children = React5.createElement(PopChild, { isPresent: isPresent2 }, children);
  }
  return React5.createElement(PresenceContext.Provider, { value: context }, children);
};
function newChildrenMap() {
  return /* @__PURE__ */ new Map();
}

// node_modules/framer-motion/dist/es/utils/use-unmount-effect.mjs
var import_react44 = __toESM(require_react(), 1);
function useUnmountEffect(callback) {
  return (0, import_react44.useEffect)(() => () => callback(), []);
}

// node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs
var getChildKey = (child) => child.key || "";
function updateChildLookup(children, allChildren) {
  children.forEach((child) => {
    const key = getChildKey(child);
    allChildren.set(key, child);
  });
}
function onlyElements(children) {
  const filtered = [];
  import_react45.Children.forEach(children, (child) => {
    if ((0, import_react45.isValidElement)(child))
      filtered.push(child);
  });
  return filtered;
}
var AnimatePresence = ({ children, custom, initial = true, onExitComplete, exitBeforeEnter, presenceAffectsLayout = true, mode: mode2 = "sync" }) => {
  invariant(!exitBeforeEnter, "Replace exitBeforeEnter with mode='wait'");
  const forceRender = (0, import_react45.useContext)(LayoutGroupContext).forceRender || useForceUpdate()[0];
  const isMounted = useIsMounted();
  const filteredChildren = onlyElements(children);
  let childrenToRender = filteredChildren;
  const exitingChildren = (0, import_react45.useRef)(/* @__PURE__ */ new Map()).current;
  const presentChildren = (0, import_react45.useRef)(childrenToRender);
  const allChildren = (0, import_react45.useRef)(/* @__PURE__ */ new Map()).current;
  const isInitialRender = (0, import_react45.useRef)(true);
  useIsomorphicLayoutEffect(() => {
    isInitialRender.current = false;
    updateChildLookup(filteredChildren, allChildren);
    presentChildren.current = childrenToRender;
  });
  useUnmountEffect(() => {
    isInitialRender.current = true;
    allChildren.clear();
    exitingChildren.clear();
  });
  if (isInitialRender.current) {
    return React6.createElement(React6.Fragment, null, childrenToRender.map((child) => React6.createElement(PresenceChild, { key: getChildKey(child), isPresent: true, initial: initial ? void 0 : false, presenceAffectsLayout, mode: mode2 }, child)));
  }
  childrenToRender = [...childrenToRender];
  const presentKeys = presentChildren.current.map(getChildKey);
  const targetKeys = filteredChildren.map(getChildKey);
  const numPresent = presentKeys.length;
  for (let i = 0; i < numPresent; i++) {
    const key = presentKeys[i];
    if (targetKeys.indexOf(key) === -1 && !exitingChildren.has(key)) {
      exitingChildren.set(key, void 0);
    }
  }
  if (mode2 === "wait" && exitingChildren.size) {
    childrenToRender = [];
  }
  exitingChildren.forEach((component, key) => {
    if (targetKeys.indexOf(key) !== -1)
      return;
    const child = allChildren.get(key);
    if (!child)
      return;
    const insertionIndex = presentKeys.indexOf(key);
    let exitingComponent = component;
    if (!exitingComponent) {
      const onExit = () => {
        exitingChildren.delete(key);
        const leftOverKeys = Array.from(allChildren.keys()).filter((childKey) => !targetKeys.includes(childKey));
        leftOverKeys.forEach((leftOverKey) => allChildren.delete(leftOverKey));
        presentChildren.current = filteredChildren.filter((presentChild) => {
          const presentChildKey = getChildKey(presentChild);
          return (
            // filter out the node exiting
            presentChildKey === key || // filter out the leftover children
            leftOverKeys.includes(presentChildKey)
          );
        });
        if (!exitingChildren.size) {
          if (isMounted.current === false)
            return;
          forceRender();
          onExitComplete && onExitComplete();
        }
      };
      exitingComponent = React6.createElement(PresenceChild, { key: getChildKey(child), isPresent: false, onExitComplete: onExit, custom, presenceAffectsLayout, mode: mode2 }, child);
      exitingChildren.set(key, exitingComponent);
    }
    childrenToRender.splice(insertionIndex, 0, exitingComponent);
  });
  childrenToRender = childrenToRender.map((child) => {
    const key = child.key;
    return exitingChildren.has(key) ? child : React6.createElement(PresenceChild, { key: getChildKey(child), isPresent: true, presenceAffectsLayout, mode: mode2 }, child);
  });
  if (mode2 === "wait" && childrenToRender.length > 1) {
    console.warn(`You're attempting to animate multiple children within AnimatePresence, but its mode is set to "wait". This will lead to odd visual behaviour.`);
  }
  return React6.createElement(React6.Fragment, null, exitingChildren.size ? childrenToRender : childrenToRender.map((child) => (0, import_react45.cloneElement)(child)));
};

// node_modules/@chakra-ui/toast/dist/chunk-VXESY33O.mjs
var import_react46 = __toESM(require_react(), 1);
var import_jsx_runtime8 = __toESM(require_jsx_runtime(), 1);
"use client";
var toastMotionVariants = {
  initial: (props) => {
    const { position: position2 } = props;
    const dir = ["top", "bottom"].includes(position2) ? "y" : "x";
    let factor = ["top-right", "bottom-right"].includes(position2) ? 1 : -1;
    if (position2 === "bottom")
      factor = 1;
    return {
      opacity: 0,
      [dir]: factor * 24
    };
  },
  animate: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  exit: {
    opacity: 0,
    scale: 0.85,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 1, 1]
    }
  }
};
var ToastComponent = (0, import_react46.memo)((props) => {
  const {
    id: id3,
    message,
    onCloseComplete,
    onRequestRemove,
    requestClose = false,
    position: position2 = "bottom",
    duration = 5e3,
    containerStyle,
    motionVariants = toastMotionVariants,
    toastSpacing = "0.5rem"
  } = props;
  const [delay2, setDelay] = (0, import_react46.useState)(duration);
  const isPresent2 = useIsPresent();
  useUpdateEffect(() => {
    if (!isPresent2) {
      onCloseComplete == null ? void 0 : onCloseComplete();
    }
  }, [isPresent2]);
  useUpdateEffect(() => {
    setDelay(duration);
  }, [duration]);
  const onMouseEnter = () => setDelay(null);
  const onMouseLeave = () => setDelay(duration);
  const close = () => {
    if (isPresent2)
      onRequestRemove();
  };
  (0, import_react46.useEffect)(() => {
    if (isPresent2 && requestClose) {
      onRequestRemove();
    }
  }, [isPresent2, requestClose, onRequestRemove]);
  useTimeout(close, delay2);
  const containerStyles = (0, import_react46.useMemo)(
    () => ({
      pointerEvents: "auto",
      maxWidth: 560,
      minWidth: 300,
      margin: toastSpacing,
      ...containerStyle
    }),
    [containerStyle, toastSpacing]
  );
  const toastStyle = (0, import_react46.useMemo)(() => getToastStyle(position2), [position2]);
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
    motion.div,
    {
      layout: true,
      className: "chakra-toast",
      variants: motionVariants,
      initial: "initial",
      animate: "animate",
      exit: "exit",
      onHoverStart: onMouseEnter,
      onHoverEnd: onMouseLeave,
      custom: { position: position2 },
      style: toastStyle,
      children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
        chakra.div,
        {
          role: "status",
          "aria-atomic": "true",
          className: "chakra-toast__inner",
          __css: containerStyles,
          children: runIfFn(message, { id: id3, onClose: close })
        }
      )
    }
  );
});
ToastComponent.displayName = "ToastComponent";

// node_modules/@chakra-ui/icon/dist/chunk-2GBDXOMA.mjs
var import_jsx_runtime9 = __toESM(require_jsx_runtime(), 1);
"use client";
var fallbackIcon = {
  path: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("g", { stroke: "currentColor", strokeWidth: "1.5", children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
      "path",
      {
        strokeLinecap: "round",
        fill: "none",
        d: "M9,9a3,3,0,1,1,4,2.829,1.5,1.5,0,0,0-1,1.415V14.25"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
      "path",
      {
        fill: "currentColor",
        strokeLinecap: "round",
        d: "M12,17.25a.375.375,0,1,0,.375.375A.375.375,0,0,0,12,17.25h0"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("circle", { fill: "none", strokeMiterlimit: "10", cx: "12", cy: "12", r: "11.25" })
  ] }),
  viewBox: "0 0 24 24"
};
var Icon = forwardRef((props, ref) => {
  const {
    as: element,
    viewBox,
    color: color3 = "currentColor",
    focusable = false,
    children,
    className,
    __css,
    ...rest
  } = props;
  const _className = cx("chakra-icon", className);
  const customStyles = useStyleConfig("Icon", props);
  const styles2 = {
    w: "1em",
    h: "1em",
    display: "inline-block",
    lineHeight: "1em",
    flexShrink: 0,
    color: color3,
    ...__css,
    ...customStyles
  };
  const shared = {
    ref,
    focusable,
    className: _className,
    __css: styles2
  };
  const _viewBox = viewBox != null ? viewBox : fallbackIcon.viewBox;
  if (element && typeof element !== "string") {
    return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(chakra.svg, { as: element, ...shared, ...rest });
  }
  const _path = children != null ? children : fallbackIcon.path;
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(chakra.svg, { verticalAlign: "middle", viewBox: _viewBox, ...shared, ...rest, children: _path });
});
Icon.displayName = "Icon";

// node_modules/@chakra-ui/icon/dist/index.mjs
"use client";

// node_modules/@chakra-ui/alert/dist/chunk-NEDBTDT2.mjs
var import_jsx_runtime10 = __toESM(require_jsx_runtime(), 1);
"use client";
function CheckIcon(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Icon, { viewBox: "0 0 24 24", ...props, children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
    "path",
    {
      fill: "currentColor",
      d: "M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
    }
  ) });
}
function InfoIcon(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Icon, { viewBox: "0 0 24 24", ...props, children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
    "path",
    {
      fill: "currentColor",
      d: "M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm.25,5a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,12.25,5ZM14.5,18.5h-4a1,1,0,0,1,0-2h.75a.25.25,0,0,0,.25-.25v-4.5a.25.25,0,0,0-.25-.25H10.5a1,1,0,0,1,0-2h1a2,2,0,0,1,2,2v4.75a.25.25,0,0,0,.25.25h.75a1,1,0,1,1,0,2Z"
    }
  ) });
}
function WarningIcon(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Icon, { viewBox: "0 0 24 24", ...props, children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
    "path",
    {
      fill: "currentColor",
      d: "M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"
    }
  ) });
}

// node_modules/@chakra-ui/spinner/dist/chunk-5PH6ULNP.mjs
var import_jsx_runtime11 = __toESM(require_jsx_runtime(), 1);
"use client";
var spin = keyframes({
  "0%": {
    transform: "rotate(0deg)"
  },
  "100%": {
    transform: "rotate(360deg)"
  }
});
var Spinner = forwardRef((props, ref) => {
  const styles2 = useStyleConfig("Spinner", props);
  const {
    label = "Loading...",
    thickness = "2px",
    speed = "0.45s",
    emptyColor = "transparent",
    className,
    ...rest
  } = omitThemingProps(props);
  const _className = cx("chakra-spinner", className);
  const spinnerStyles = {
    display: "inline-block",
    borderColor: "currentColor",
    borderStyle: "solid",
    borderRadius: "99999px",
    borderWidth: thickness,
    borderBottomColor: emptyColor,
    borderLeftColor: emptyColor,
    animation: `${spin} ${speed} linear infinite`,
    ...styles2
  };
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
    chakra.div,
    {
      ref,
      __css: spinnerStyles,
      className: _className,
      ...rest,
      children: label && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(chakra.span, { srOnly: true, children: label })
    }
  );
});
Spinner.displayName = "Spinner";

// node_modules/@chakra-ui/spinner/dist/index.mjs
"use client";

// node_modules/@chakra-ui/alert/dist/chunk-XCES3W5V.mjs
"use client";
var [AlertProvider, useAlertContext] = createContext({
  name: "AlertContext",
  hookName: "useAlertContext",
  providerName: "<Alert />"
});
var [AlertStylesProvider, useAlertStyles] = createContext({
  name: `AlertStylesContext`,
  hookName: `useAlertStyles`,
  providerName: "<Alert />"
});
var STATUSES = {
  info: { icon: InfoIcon, colorScheme: "blue" },
  warning: { icon: WarningIcon, colorScheme: "orange" },
  success: { icon: CheckIcon, colorScheme: "green" },
  error: { icon: WarningIcon, colorScheme: "red" },
  loading: { icon: Spinner, colorScheme: "blue" }
};
function getStatusColorScheme(status) {
  return STATUSES[status].colorScheme;
}
function getStatusIcon(status) {
  return STATUSES[status].icon;
}

// node_modules/@chakra-ui/alert/dist/chunk-CUKBNH6U.mjs
var import_jsx_runtime12 = __toESM(require_jsx_runtime(), 1);
"use client";
var AlertDescription = forwardRef(
  function AlertDescription2(props, ref) {
    const styles2 = useAlertStyles();
    const { status } = useAlertContext();
    const descriptionStyles = {
      display: "inline",
      ...styles2.description
    };
    return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
      chakra.div,
      {
        ref,
        "data-status": status,
        ...props,
        className: cx("chakra-alert__desc", props.className),
        __css: descriptionStyles
      }
    );
  }
);
AlertDescription.displayName = "AlertDescription";

// node_modules/@chakra-ui/alert/dist/chunk-ALC6QPCI.mjs
var import_jsx_runtime13 = __toESM(require_jsx_runtime(), 1);
"use client";
function AlertIcon(props) {
  const { status } = useAlertContext();
  const BaseIcon = getStatusIcon(status);
  const styles2 = useAlertStyles();
  const css3 = status === "loading" ? styles2.spinner : styles2.icon;
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
    chakra.span,
    {
      display: "inherit",
      "data-status": status,
      ...props,
      className: cx("chakra-alert__icon", props.className),
      __css: css3,
      children: props.children || /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(BaseIcon, { h: "100%", w: "100%" })
    }
  );
}
AlertIcon.displayName = "AlertIcon";

// node_modules/@chakra-ui/alert/dist/chunk-QURMB2UJ.mjs
var import_jsx_runtime14 = __toESM(require_jsx_runtime(), 1);
"use client";
var AlertTitle = forwardRef(
  function AlertTitle2(props, ref) {
    const styles2 = useAlertStyles();
    const { status } = useAlertContext();
    return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
      chakra.div,
      {
        ref,
        "data-status": status,
        ...props,
        className: cx("chakra-alert__title", props.className),
        __css: styles2.title
      }
    );
  }
);
AlertTitle.displayName = "AlertTitle";

// node_modules/@chakra-ui/alert/dist/chunk-3KCBMPN5.mjs
var import_jsx_runtime15 = __toESM(require_jsx_runtime(), 1);
"use client";
var Alert = forwardRef(function Alert2(props, ref) {
  var _a7;
  const { status = "info", addRole = true, ...rest } = omitThemingProps(props);
  const colorScheme = (_a7 = props.colorScheme) != null ? _a7 : getStatusColorScheme(status);
  const styles2 = useMultiStyleConfig("Alert", { ...props, colorScheme });
  const alertStyles = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    ...styles2.container
  };
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(AlertProvider, { value: { status }, children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(AlertStylesProvider, { value: styles2, children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
    chakra.div,
    {
      "data-status": status,
      role: addRole ? "alert" : void 0,
      ref,
      ...rest,
      className: cx("chakra-alert", props.className),
      __css: alertStyles
    }
  ) }) });
});
Alert.displayName = "Alert";

// node_modules/@chakra-ui/alert/dist/index.mjs
"use client";

// node_modules/@chakra-ui/close-button/dist/chunk-37N6GCLA.mjs
var import_jsx_runtime16 = __toESM(require_jsx_runtime(), 1);
"use client";
function CloseIcon(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(Icon, { focusable: "false", "aria-hidden": true, ...props, children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
    "path",
    {
      fill: "currentColor",
      d: "M.439,21.44a1.5,1.5,0,0,0,2.122,2.121L11.823,14.3a.25.25,0,0,1,.354,0l9.262,9.263a1.5,1.5,0,1,0,2.122-2.121L14.3,12.177a.25.25,0,0,1,0-.354l9.263-9.262A1.5,1.5,0,0,0,21.439.44L12.177,9.7a.25.25,0,0,1-.354,0L2.561.44A1.5,1.5,0,0,0,.439,2.561L9.7,11.823a.25.25,0,0,1,0,.354Z"
    }
  ) });
}
var CloseButton = forwardRef(
  function CloseButton2(props, ref) {
    const styles2 = useStyleConfig("CloseButton", props);
    const { children, isDisabled, __css, ...rest } = omitThemingProps(props);
    const baseStyle43 = {
      outline: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0
    };
    return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
      chakra.button,
      {
        type: "button",
        "aria-label": "Close",
        ref,
        disabled: isDisabled,
        __css: {
          ...baseStyle43,
          ...styles2,
          ...__css
        },
        ...rest,
        children: children || /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(CloseIcon, { width: "1em", height: "1em" })
      }
    );
  }
);
CloseButton.displayName = "CloseButton";

// node_modules/@chakra-ui/close-button/dist/index.mjs
"use client";

// node_modules/@chakra-ui/toast/dist/chunk-HYCJNCPE.mjs
var import_jsx_runtime17 = __toESM(require_jsx_runtime(), 1);
"use client";
var initialState = {
  top: [],
  "top-left": [],
  "top-right": [],
  "bottom-left": [],
  bottom: [],
  "bottom-right": []
};
var toastStore = createStore(initialState);
function createStore(initialState2) {
  let state2 = initialState2;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (setStateFn) => {
    state2 = setStateFn(state2);
    listeners.forEach((l) => l());
  };
  return {
    getState: () => state2,
    subscribe: (listener) => {
      listeners.add(listener);
      return () => {
        setState(() => initialState2);
        listeners.delete(listener);
      };
    },
    /**
     * Delete a toast record at its position
     */
    removeToast: (id3, position2) => {
      setState((prevState) => ({
        ...prevState,
        // id may be string or number
        // eslint-disable-next-line eqeqeq
        [position2]: prevState[position2].filter((toast) => toast.id != id3)
      }));
    },
    notify: (message, options) => {
      const toast = createToast(message, options);
      const { position: position2, id: id3 } = toast;
      setState((prevToasts) => {
        var _a7, _b5;
        const isTop = position2.includes("top");
        const toasts = isTop ? [toast, ...(_a7 = prevToasts[position2]) != null ? _a7 : []] : [...(_b5 = prevToasts[position2]) != null ? _b5 : [], toast];
        return {
          ...prevToasts,
          [position2]: toasts
        };
      });
      return id3;
    },
    update: (id3, options) => {
      if (!id3)
        return;
      setState((prevState) => {
        const nextState = { ...prevState };
        const { position: position2, index: index2 } = findToast(nextState, id3);
        if (position2 && index2 !== -1) {
          nextState[position2][index2] = {
            ...nextState[position2][index2],
            ...options,
            message: createRenderToast(options)
          };
        }
        return nextState;
      });
    },
    closeAll: ({ positions } = {}) => {
      setState((prev) => {
        const allPositions = [
          "bottom",
          "bottom-right",
          "bottom-left",
          "top",
          "top-left",
          "top-right"
        ];
        const positionsToClose = positions != null ? positions : allPositions;
        return positionsToClose.reduce(
          (acc, position2) => {
            acc[position2] = prev[position2].map((toast) => ({
              ...toast,
              requestClose: true
            }));
            return acc;
          },
          { ...prev }
        );
      });
    },
    close: (id3) => {
      setState((prevState) => {
        const position2 = getToastPosition(prevState, id3);
        if (!position2)
          return prevState;
        return {
          ...prevState,
          [position2]: prevState[position2].map((toast) => {
            if (toast.id == id3) {
              return {
                ...toast,
                requestClose: true
              };
            }
            return toast;
          })
        };
      });
    },
    isActive: (id3) => Boolean(findToast(toastStore.getState(), id3).position)
  };
}
var counter = 0;
function createToast(message, options = {}) {
  var _a7, _b5;
  counter += 1;
  const id3 = (_a7 = options.id) != null ? _a7 : counter;
  const position2 = (_b5 = options.position) != null ? _b5 : "bottom";
  return {
    id: id3,
    message,
    position: position2,
    duration: options.duration,
    onCloseComplete: options.onCloseComplete,
    onRequestRemove: () => toastStore.removeToast(String(id3), position2),
    status: options.status,
    requestClose: false,
    containerStyle: options.containerStyle
  };
}
var Toast = (props) => {
  const {
    status,
    variant = "solid",
    id: id3,
    title,
    isClosable,
    onClose,
    description,
    colorScheme,
    icon
  } = props;
  const ids = id3 ? {
    root: `toast-${id3}`,
    title: `toast-${id3}-title`,
    description: `toast-${id3}-description`
  } : void 0;
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(
    Alert,
    {
      addRole: false,
      status,
      variant,
      id: ids == null ? void 0 : ids.root,
      alignItems: "start",
      borderRadius: "md",
      boxShadow: "lg",
      paddingEnd: 8,
      textAlign: "start",
      width: "auto",
      colorScheme,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(AlertIcon, { children: icon }),
        /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(chakra.div, { flex: "1", maxWidth: "100%", children: [
          title && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(AlertTitle, { id: ids == null ? void 0 : ids.title, children: title }),
          description && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(AlertDescription, { id: ids == null ? void 0 : ids.description, display: "block", children: description })
        ] }),
        isClosable && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
          CloseButton,
          {
            size: "sm",
            onClick: onClose,
            position: "absolute",
            insetEnd: 1,
            top: 1
          }
        )
      ]
    }
  );
};
function createRenderToast(options = {}) {
  const { render, toastComponent: ToastComponent2 = Toast } = options;
  const renderToast = (props) => {
    if (typeof render === "function") {
      return render({ ...props, ...options });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(ToastComponent2, { ...props, ...options });
  };
  return renderToast;
}

// node_modules/@chakra-ui/toast/dist/chunk-3Y4YXCR2.mjs
var import_react47 = __toESM(require_react(), 1);
var import_jsx_runtime18 = __toESM(require_jsx_runtime(), 1);
"use client";
var [ToastOptionProvider, useToastOptionContext] = createContext({
  name: `ToastOptionsContext`,
  strict: false
});
var ToastProvider = (props) => {
  const state2 = (0, import_react47.useSyncExternalStore)(
    toastStore.subscribe,
    toastStore.getState,
    toastStore.getState
  );
  const {
    motionVariants,
    component: Component2 = ToastComponent,
    portalProps
  } = props;
  const stateKeys = Object.keys(state2);
  const toastList = stateKeys.map((position2) => {
    const toasts = state2[position2];
    return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
      "div",
      {
        role: "region",
        "aria-live": "polite",
        "aria-label": `Notifications-${position2}`,
        id: `chakra-toast-manager-${position2}`,
        style: getToastListStyle(position2),
        children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(AnimatePresence, { initial: false, children: toasts.map((toast) => /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
          Component2,
          {
            motionVariants,
            ...toast
          },
          toast.id
        )) })
      },
      position2
    );
  });
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(Portal, { ...portalProps, children: toastList });
};

// node_modules/@chakra-ui/toast/dist/index.mjs
"use client";

// node_modules/@chakra-ui/react/dist/chunk-QAITB7GG.mjs
var import_jsx_runtime19 = __toESM(require_jsx_runtime(), 1);
"use client";
var createChakraProvider = (providerTheme) => {
  return function ChakraProvider22({
    children,
    theme: theme2 = providerTheme,
    toastOptions,
    ...restProps
  }) {
    return /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(ChakraProvider, { theme: theme2, ...restProps, children: [
      /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(ToastOptionProvider, { value: toastOptions == null ? void 0 : toastOptions.defaultOptions, children }),
      /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(ToastProvider, { ...toastOptions })
    ] });
  };
};
var ChakraProvider2 = createChakraProvider(theme);
var ChakraBaseProvider = createChakraProvider(baseTheme);

// node_modules/@chakra-ui/react-use-merge-refs/dist/index.mjs
var import_react48 = __toESM(require_react(), 1);
"use client";
function assignRef(ref, value) {
  if (ref == null)
    return;
  if (typeof ref === "function") {
    ref(value);
    return;
  }
  try {
    ref.current = value;
  } catch (error2) {
    throw new Error(`Cannot assign value '${value}' to ref '${ref}'`);
  }
}
function mergeRefs(...refs) {
  return (node) => {
    refs.forEach((ref) => {
      assignRef(ref, node);
    });
  };
}

// node_modules/@chakra-ui/react-use-event-listener/dist/index.mjs
var import_react49 = __toESM(require_react(), 1);
"use client";
function useEventListener(target, event, handler, options) {
  const listener = useCallbackRef(handler);
  (0, import_react49.useEffect)(() => {
    const node = typeof target === "function" ? target() : target != null ? target : document;
    if (!handler || !node)
      return;
    node.addEventListener(event, listener, options);
    return () => {
      node.removeEventListener(event, listener, options);
    };
  }, [event, target, options, listener, handler]);
  return () => {
    const node = typeof target === "function" ? target() : target != null ? target : document;
    node == null ? void 0 : node.removeEventListener(event, listener, options);
  };
}

// node_modules/@chakra-ui/dom-utils/dist/chunk-3XANSPY5.mjs
function isElement(el) {
  return el != null && typeof el == "object" && "nodeType" in el && el.nodeType === Node.ELEMENT_NODE;
}
function isHTMLElement(el) {
  var _a7;
  if (!isElement(el))
    return false;
  const win = (_a7 = el.ownerDocument.defaultView) != null ? _a7 : window;
  return el instanceof win.HTMLElement;
}

// node_modules/@chakra-ui/dom-utils/dist/chunk-4WEUWBTD.mjs
function isScrollParent(el) {
  const win = el.ownerDocument.defaultView || window;
  const { overflow, overflowX, overflowY } = win.getComputedStyle(el);
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}
function getParent(el) {
  if (el.localName === "html")
    return el;
  return el.assignedSlot || el.parentElement || el.ownerDocument.documentElement;
}
function getScrollParent(el) {
  if (["html", "body", "#document"].includes(el.localName)) {
    return el.ownerDocument.body;
  }
  if (isHTMLElement(el) && isScrollParent(el)) {
    return el;
  }
  return getScrollParent(getParent(el));
}

// node_modules/@chakra-ui/dom-utils/dist/index.mjs
var focusableElList = [
  "input:not(:disabled):not([disabled])",
  "select:not(:disabled):not([disabled])",
  "textarea:not(:disabled):not([disabled])",
  "embed",
  "iframe",
  "object",
  "a[href]",
  "area[href]",
  "button:not(:disabled):not([disabled])",
  "[tabindex]",
  "audio[controls]",
  "video[controls]",
  "*[tabindex]:not([aria-disabled])",
  "*[contenteditable]"
];
var focusableElSelector = focusableElList.join();

// node_modules/@chakra-ui/layout/dist/chunk-Z6RXEUPO.mjs
var import_jsx_runtime20 = __toESM(require_jsx_runtime(), 1);
"use client";
var Badge = forwardRef(function Badge2(props, ref) {
  const styles2 = useStyleConfig("Badge", props);
  const { className, ...rest } = omitThemingProps(props);
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
    chakra.span,
    {
      ref,
      className: cx("chakra-badge", props.className),
      ...rest,
      __css: {
        display: "inline-block",
        whiteSpace: "nowrap",
        verticalAlign: "middle",
        ...styles2
      }
    }
  );
});
Badge.displayName = "Badge";

// node_modules/@chakra-ui/layout/dist/index.mjs
"use client";

// node_modules/@chakra-ui/popper/dist/chunk-6WT2JRWX.mjs
"use client";
var toVar2 = (value, fallback) => ({
  var: value,
  varRef: fallback ? `var(${value}, ${fallback})` : `var(${value})`
});
var cssVars = {
  arrowShadowColor: toVar2("--popper-arrow-shadow-color"),
  arrowSize: toVar2("--popper-arrow-size", "8px"),
  arrowSizeHalf: toVar2("--popper-arrow-size-half"),
  arrowBg: toVar2("--popper-arrow-bg"),
  transformOrigin: toVar2("--popper-transform-origin"),
  arrowOffset: toVar2("--popper-arrow-offset")
};
function getBoxShadow(placement) {
  if (placement.includes("top"))
    return `1px 1px 0px 0 var(--popper-arrow-shadow-color)`;
  if (placement.includes("bottom"))
    return `-1px -1px 0px 0 var(--popper-arrow-shadow-color)`;
  if (placement.includes("right"))
    return `-1px 1px 0px 0 var(--popper-arrow-shadow-color)`;
  if (placement.includes("left"))
    return `1px -1px 0px 0 var(--popper-arrow-shadow-color)`;
}
var transforms = {
  top: "bottom center",
  "top-start": "bottom left",
  "top-end": "bottom right",
  bottom: "top center",
  "bottom-start": "top left",
  "bottom-end": "top right",
  left: "right center",
  "left-start": "right top",
  "left-end": "right bottom",
  right: "left center",
  "right-start": "left top",
  "right-end": "left bottom"
};
var toTransformOrigin = (placement) => transforms[placement];
var defaultEventListeners = {
  scroll: true,
  resize: true
};
function getEventListenerOptions(value) {
  let eventListeners;
  if (typeof value === "object") {
    eventListeners = {
      enabled: true,
      options: { ...defaultEventListeners, ...value }
    };
  } else {
    eventListeners = {
      enabled: value,
      options: defaultEventListeners
    };
  }
  return eventListeners;
}

// node_modules/@chakra-ui/popper/dist/chunk-P4KPSAOW.mjs
"use client";
var matchWidth = {
  name: "matchWidth",
  enabled: true,
  phase: "beforeWrite",
  requires: ["computeStyles"],
  fn: ({ state: state2 }) => {
    state2.styles.popper.width = `${state2.rects.reference.width}px`;
  },
  effect: ({ state: state2 }) => () => {
    const reference2 = state2.elements.reference;
    state2.elements.popper.style.width = `${reference2.offsetWidth}px`;
  }
};
var transformOrigin = {
  name: "transformOrigin",
  enabled: true,
  phase: "write",
  fn: ({ state: state2 }) => {
    setTransformOrigin(state2);
  },
  effect: ({ state: state2 }) => () => {
    setTransformOrigin(state2);
  }
};
var setTransformOrigin = (state2) => {
  state2.elements.popper.style.setProperty(
    cssVars.transformOrigin.var,
    toTransformOrigin(state2.placement)
  );
};
var positionArrow = {
  name: "positionArrow",
  enabled: true,
  phase: "afterWrite",
  fn: ({ state: state2 }) => {
    setArrowStyles(state2);
  }
};
var setArrowStyles = (state2) => {
  var _a7;
  if (!state2.placement)
    return;
  const overrides = getArrowStyle(state2.placement);
  if (((_a7 = state2.elements) == null ? void 0 : _a7.arrow) && overrides) {
    Object.assign(state2.elements.arrow.style, {
      [overrides.property]: overrides.value,
      width: cssVars.arrowSize.varRef,
      height: cssVars.arrowSize.varRef,
      zIndex: -1
    });
    const vars2 = {
      [cssVars.arrowSizeHalf.var]: `calc(${cssVars.arrowSize.varRef} / 2 - 1px)`,
      [cssVars.arrowOffset.var]: `calc(${cssVars.arrowSizeHalf.varRef} * -1)`
    };
    for (const property in vars2) {
      state2.elements.arrow.style.setProperty(property, vars2[property]);
    }
  }
};
var getArrowStyle = (placement) => {
  if (placement.startsWith("top")) {
    return { property: "bottom", value: cssVars.arrowOffset.varRef };
  }
  if (placement.startsWith("bottom")) {
    return { property: "top", value: cssVars.arrowOffset.varRef };
  }
  if (placement.startsWith("left")) {
    return { property: "right", value: cssVars.arrowOffset.varRef };
  }
  if (placement.startsWith("right")) {
    return { property: "left", value: cssVars.arrowOffset.varRef };
  }
};
var innerArrow = {
  name: "innerArrow",
  enabled: true,
  phase: "main",
  requires: ["arrow"],
  fn: ({ state: state2 }) => {
    setInnerArrowStyles(state2);
  },
  effect: ({ state: state2 }) => () => {
    setInnerArrowStyles(state2);
  }
};
var setInnerArrowStyles = (state2) => {
  if (!state2.elements.arrow)
    return;
  const inner = state2.elements.arrow.querySelector(
    "[data-popper-arrow-inner]"
  );
  if (!inner)
    return;
  const boxShadow = getBoxShadow(state2.placement);
  if (boxShadow) {
    inner.style.setProperty("--popper-arrow-default-shadow", boxShadow);
  }
  Object.assign(inner.style, {
    transform: "rotate(45deg)",
    background: cssVars.arrowBg.varRef,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: "inherit",
    boxShadow: `var(--popper-arrow-shadow, var(--popper-arrow-default-shadow))`
  });
};

// node_modules/@chakra-ui/popper/dist/chunk-AUJXXV3B.mjs
"use client";
var logicals = {
  "start-start": { ltr: "left-start", rtl: "right-start" },
  "start-end": { ltr: "left-end", rtl: "right-end" },
  "end-start": { ltr: "right-start", rtl: "left-start" },
  "end-end": { ltr: "right-end", rtl: "left-end" },
  start: { ltr: "left", rtl: "right" },
  end: { ltr: "right", rtl: "left" }
};
var opposites = {
  "auto-start": "auto-end",
  "auto-end": "auto-start",
  "top-start": "top-end",
  "top-end": "top-start",
  "bottom-start": "bottom-end",
  "bottom-end": "bottom-start"
};
function getPopperPlacement(placement, dir = "ltr") {
  var _a7, _b5;
  const value = ((_a7 = logicals[placement]) == null ? void 0 : _a7[dir]) || placement;
  if (dir === "ltr")
    return value;
  return (_b5 = opposites[placement]) != null ? _b5 : value;
}

// node_modules/@popperjs/core/lib/enums.js
var top = "top";
var bottom = "bottom";
var right = "right";
var left = "left";
var auto2 = "auto";
var basePlacements = [top, bottom, right, left];
var start = "start";
var end = "end";
var clippingParents = "clippingParents";
var viewport = "viewport";
var popper = "popper";
var reference = "reference";
var variationPlacements = /* @__PURE__ */ basePlacements.reduce(function(acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /* @__PURE__ */ [].concat(basePlacements, [auto2]).reduce(function(acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []);
var beforeRead = "beforeRead";
var read = "read";
var afterRead = "afterRead";
var beforeMain = "beforeMain";
var main = "main";
var afterMain = "afterMain";
var beforeWrite = "beforeWrite";
var write = "write";
var afterWrite = "afterWrite";
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

// node_modules/@popperjs/core/lib/dom-utils/getNodeName.js
function getNodeName(element) {
  return element ? (element.nodeName || "").toLowerCase() : null;
}

// node_modules/@popperjs/core/lib/dom-utils/getWindow.js
function getWindow(node) {
  if (node == null) {
    return window;
  }
  if (node.toString() !== "[object Window]") {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }
  return node;
}

// node_modules/@popperjs/core/lib/dom-utils/instanceOf.js
function isElement2(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
function isHTMLElement2(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}
function isShadowRoot(node) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}

// node_modules/@popperjs/core/lib/modifiers/applyStyles.js
function applyStyles(_ref) {
  var state2 = _ref.state;
  Object.keys(state2.elements).forEach(function(name) {
    var style = state2.styles[name] || {};
    var attributes = state2.attributes[name] || {};
    var element = state2.elements[name];
    if (!isHTMLElement2(element) || !getNodeName(element)) {
      return;
    }
    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function(name2) {
      var value = attributes[name2];
      if (value === false) {
        element.removeAttribute(name2);
      } else {
        element.setAttribute(name2, value === true ? "" : value);
      }
    });
  });
}
function effect2(_ref2) {
  var state2 = _ref2.state;
  var initialStyles = {
    popper: {
      position: state2.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  Object.assign(state2.elements.popper.style, initialStyles.popper);
  state2.styles = initialStyles;
  if (state2.elements.arrow) {
    Object.assign(state2.elements.arrow.style, initialStyles.arrow);
  }
  return function() {
    Object.keys(state2.elements).forEach(function(name) {
      var element = state2.elements[name];
      var attributes = state2.attributes[name] || {};
      var styleProperties = Object.keys(state2.styles.hasOwnProperty(name) ? state2.styles[name] : initialStyles[name]);
      var style = styleProperties.reduce(function(style2, property) {
        style2[property] = "";
        return style2;
      }, {});
      if (!isHTMLElement2(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function(attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
}
var applyStyles_default = {
  name: "applyStyles",
  enabled: true,
  phase: "write",
  fn: applyStyles,
  effect: effect2,
  requires: ["computeStyles"]
};

// node_modules/@popperjs/core/lib/utils/getBasePlacement.js
function getBasePlacement(placement) {
  return placement.split("-")[0];
}

// node_modules/@popperjs/core/lib/utils/math.js
var max = Math.max;
var min = Math.min;
var round = Math.round;

// node_modules/@popperjs/core/lib/utils/userAgent.js
function getUAString() {
  var uaData = navigator.userAgentData;
  if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) {
    return uaData.brands.map(function(item) {
      return item.brand + "/" + item.version;
    }).join(" ");
  }
  return navigator.userAgent;
}

// node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js
function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test(getUAString());
}

// node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js
function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  var clientRect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;
  if (includeScale && isHTMLElement2(element)) {
    scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
  }
  var _ref = isElement2(element) ? getWindow(element) : window, visualViewport = _ref.visualViewport;
  var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
  var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
  var width = clientRect.width / scaleX;
  var height = clientRect.height / scaleY;
  return {
    width,
    height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
    x,
    y
  };
}

// node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js
function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element);
  var width = element.offsetWidth;
  var height = element.offsetHeight;
  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }
  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width,
    height
  };
}

// node_modules/@popperjs/core/lib/dom-utils/contains.js
function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode();
  if (parent.contains(child)) {
    return true;
  } else if (rootNode && isShadowRoot(rootNode)) {
    var next = child;
    do {
      if (next && parent.isSameNode(next)) {
        return true;
      }
      next = next.parentNode || next.host;
    } while (next);
  }
  return false;
}

// node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js
function getComputedStyle3(element) {
  return getWindow(element).getComputedStyle(element);
}

// node_modules/@popperjs/core/lib/dom-utils/isTableElement.js
function isTableElement(element) {
  return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
}

// node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js
function getDocumentElement(element) {
  return ((isElement2(element) ? element.ownerDocument : (
    // $FlowFixMe[prop-missing]
    element.document
  )) || window.document).documentElement;
}

// node_modules/@popperjs/core/lib/dom-utils/getParentNode.js
function getParentNode(element) {
  if (getNodeName(element) === "html") {
    return element;
  }
  return (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || // DOM Element detected
    (isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    getDocumentElement(element)
  );
}

// node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js
function getTrueOffsetParent(element) {
  if (!isHTMLElement2(element) || // https://github.com/popperjs/popper-core/issues/837
  getComputedStyle3(element).position === "fixed") {
    return null;
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  var isFirefox = /firefox/i.test(getUAString());
  var isIE = /Trident/i.test(getUAString());
  if (isIE && isHTMLElement2(element)) {
    var elementCss = getComputedStyle3(element);
    if (elementCss.position === "fixed") {
      return null;
    }
  }
  var currentNode = getParentNode(element);
  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }
  while (isHTMLElement2(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
    var css3 = getComputedStyle3(currentNode);
    if (css3.transform !== "none" || css3.perspective !== "none" || css3.contain === "paint" || ["transform", "perspective"].indexOf(css3.willChange) !== -1 || isFirefox && css3.willChange === "filter" || isFirefox && css3.filter && css3.filter !== "none") {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
}
function getOffsetParent(element) {
  var window2 = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle3(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle3(offsetParent).position === "static")) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}

// node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
}

// node_modules/@popperjs/core/lib/utils/within.js
function within(min2, value, max2) {
  return max(min2, min(value, max2));
}
function withinMaxClamp(min2, value, max2) {
  var v = within(min2, value, max2);
  return v > max2 ? max2 : v;
}

// node_modules/@popperjs/core/lib/utils/getFreshSideObject.js
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

// node_modules/@popperjs/core/lib/utils/mergePaddingObject.js
function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}

// node_modules/@popperjs/core/lib/utils/expandToHashMap.js
function expandToHashMap(value, keys2) {
  return keys2.reduce(function(hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

// node_modules/@popperjs/core/lib/modifiers/arrow.js
var toPaddingObject = function toPaddingObject2(padding, state2) {
  padding = typeof padding === "function" ? padding(Object.assign({}, state2.rects, {
    placement: state2.placement
  })) : padding;
  return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
};
function arrow(_ref) {
  var _state$modifiersData$;
  var state2 = _ref.state, name = _ref.name, options = _ref.options;
  var arrowElement = state2.elements.arrow;
  var popperOffsets2 = state2.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state2.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? "height" : "width";
  if (!arrowElement || !popperOffsets2) {
    return;
  }
  var paddingObject = toPaddingObject(options.padding, state2);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === "y" ? top : left;
  var maxProp = axis === "y" ? bottom : right;
  var endDiff = state2.rects.reference[len] + state2.rects.reference[axis] - popperOffsets2[axis] - state2.rects.popper[len];
  var startDiff = popperOffsets2[axis] - state2.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2;
  var min2 = paddingObject[minProp];
  var max2 = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset2 = within(min2, center, max2);
  var axisProp = axis;
  state2.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
}
function effect3(_ref2) {
  var state2 = _ref2.state, options = _ref2.options;
  var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
  if (arrowElement == null) {
    return;
  }
  if (typeof arrowElement === "string") {
    arrowElement = state2.elements.popper.querySelector(arrowElement);
    if (!arrowElement) {
      return;
    }
  }
  if (!contains(state2.elements.popper, arrowElement)) {
    return;
  }
  state2.elements.arrow = arrowElement;
}
var arrow_default = {
  name: "arrow",
  enabled: true,
  phase: "main",
  fn: arrow,
  effect: effect3,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};

// node_modules/@popperjs/core/lib/utils/getVariation.js
function getVariation(placement) {
  return placement.split("-")[1];
}

// node_modules/@popperjs/core/lib/modifiers/computeStyles.js
var unsetSides = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function roundOffsetsByDPR(_ref, win) {
  var x = _ref.x, y = _ref.y;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(x * dpr) / dpr || 0,
    y: round(y * dpr) / dpr || 0
  };
}
function mapToStyles(_ref2) {
  var _Object$assign2;
  var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position2 = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x, x = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y = _offsets$y === void 0 ? 0 : _offsets$y;
  var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
    x,
    y
  }) : {
    x,
    y
  };
  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty("x");
  var hasY = offsets.hasOwnProperty("y");
  var sideX = left;
  var sideY = top;
  var win = window;
  if (adaptive) {
    var offsetParent = getOffsetParent(popper2);
    var heightProp = "clientHeight";
    var widthProp = "clientWidth";
    if (offsetParent === getWindow(popper2)) {
      offsetParent = getDocumentElement(popper2);
      if (getComputedStyle3(offsetParent).position !== "static" && position2 === "absolute") {
        heightProp = "scrollHeight";
        widthProp = "scrollWidth";
      }
    }
    offsetParent = offsetParent;
    if (placement === top || (placement === left || placement === right) && variation === end) {
      sideY = bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        offsetParent[heightProp]
      );
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }
    if (placement === left || (placement === top || placement === bottom) && variation === end) {
      sideX = right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        offsetParent[widthProp]
      );
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }
  var commonStyles = Object.assign({
    position: position2
  }, adaptive && unsetSides);
  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x,
    y
  }, getWindow(popper2)) : {
    x,
    y
  };
  x = _ref4.x;
  y = _ref4.y;
  if (gpuAcceleration) {
    var _Object$assign;
    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }
  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
}
function computeStyles(_ref5) {
  var state2 = _ref5.state, options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  var commonStyles = {
    placement: getBasePlacement(state2.placement),
    variation: getVariation(state2.placement),
    popper: state2.elements.popper,
    popperRect: state2.rects.popper,
    gpuAcceleration,
    isFixed: state2.options.strategy === "fixed"
  };
  if (state2.modifiersData.popperOffsets != null) {
    state2.styles.popper = Object.assign({}, state2.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state2.modifiersData.popperOffsets,
      position: state2.options.strategy,
      adaptive,
      roundOffsets
    })));
  }
  if (state2.modifiersData.arrow != null) {
    state2.styles.arrow = Object.assign({}, state2.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state2.modifiersData.arrow,
      position: "absolute",
      adaptive: false,
      roundOffsets
    })));
  }
  state2.attributes.popper = Object.assign({}, state2.attributes.popper, {
    "data-popper-placement": state2.placement
  });
}
var computeStyles_default = {
  name: "computeStyles",
  enabled: true,
  phase: "beforeWrite",
  fn: computeStyles,
  data: {}
};

// node_modules/@popperjs/core/lib/modifiers/eventListeners.js
var passive = {
  passive: true
};
function effect4(_ref) {
  var state2 = _ref.state, instance = _ref.instance, options = _ref.options;
  var _options$scroll = options.scroll, scroll2 = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
  var window2 = getWindow(state2.elements.popper);
  var scrollParents = [].concat(state2.scrollParents.reference, state2.scrollParents.popper);
  if (scroll2) {
    scrollParents.forEach(function(scrollParent) {
      scrollParent.addEventListener("scroll", instance.update, passive);
    });
  }
  if (resize) {
    window2.addEventListener("resize", instance.update, passive);
  }
  return function() {
    if (scroll2) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.removeEventListener("scroll", instance.update, passive);
      });
    }
    if (resize) {
      window2.removeEventListener("resize", instance.update, passive);
    }
  };
}
var eventListeners_default = {
  name: "eventListeners",
  enabled: true,
  phase: "write",
  fn: function fn() {
  },
  effect: effect4,
  data: {}
};

// node_modules/@popperjs/core/lib/utils/getOppositePlacement.js
var hash2 = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function(matched) {
    return hash2[matched];
  });
}

// node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js
var hash3 = {
  start: "end",
  end: "start"
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function(matched) {
    return hash3[matched];
  });
}

// node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js
function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft,
    scrollTop
  };
}

// node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}

// node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js
function getViewportRect(element, strategy) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    var layoutViewport = isLayoutViewport();
    if (layoutViewport || !layoutViewport && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x: x + getWindowScrollBarX(element),
    y
  };
}

// node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js
function getDocumentRect(element) {
  var _element$ownerDocumen;
  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y = -winScroll.scrollTop;
  if (getComputedStyle3(body || html).direction === "rtl") {
    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}

// node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js
function isScrollParent2(element) {
  var _getComputedStyle = getComputedStyle3(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

// node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js
function getScrollParent2(node) {
  if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
    return node.ownerDocument.body;
  }
  if (isHTMLElement2(node) && isScrollParent2(node)) {
    return node;
  }
  return getScrollParent2(getParentNode(node));
}

// node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js
function listScrollParents(element, list2) {
  var _element$ownerDocumen;
  if (list2 === void 0) {
    list2 = [];
  }
  var scrollParent = getScrollParent2(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent2(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list2.concat(target);
  return isBody ? updatedList : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    updatedList.concat(listScrollParents(getParentNode(target)))
  );
}

// node_modules/@popperjs/core/lib/utils/rectToClientRect.js
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

// node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js
function getInnerBoundingClientRect(element, strategy) {
  var rect = getBoundingClientRect(element, false, strategy === "fixed");
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}
function getClientRectFromMixedType(element, clippingParent, strategy) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement2(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
}
function getClippingParents(element) {
  var clippingParents2 = listScrollParents(getParentNode(element));
  var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle3(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement2(element) ? getOffsetParent(element) : element;
  if (!isElement2(clipperElement)) {
    return [];
  }
  return clippingParents2.filter(function(clippingParent) {
    return isElement2(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
  });
}
function getClippingRect(element, boundary, rootBoundary, strategy) {
  var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
  var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents2[0];
  var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent, strategy));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

// node_modules/@popperjs/core/lib/utils/computeOffsets.js
function computeOffsets(_ref) {
  var reference2 = _ref.reference, element = _ref.element, placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference2.x + reference2.width / 2 - element.width / 2;
  var commonY = reference2.y + reference2.height / 2 - element.height / 2;
  var offsets;
  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference2.y - element.height
      };
      break;
    case bottom:
      offsets = {
        x: commonX,
        y: reference2.y + reference2.height
      };
      break;
    case right:
      offsets = {
        x: reference2.x + reference2.width,
        y: commonY
      };
      break;
    case left:
      offsets = {
        x: reference2.x - element.width,
        y: commonY
      };
      break;
    default:
      offsets = {
        x: reference2.x,
        y: reference2.y
      };
  }
  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
  if (mainAxis != null) {
    var len = mainAxis === "y" ? "height" : "width";
    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
        break;
      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
        break;
      default:
    }
  }
  return offsets;
}

// node_modules/@popperjs/core/lib/utils/detectOverflow.js
function detectOverflow(state2, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state2.placement : _options$placement, _options$strategy = _options.strategy, strategy = _options$strategy === void 0 ? state2.strategy : _options$strategy, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state2.rects.popper;
  var element = state2.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement2(element) ? element : element.contextElement || getDocumentElement(state2.elements.popper), boundary, rootBoundary, strategy);
  var referenceClientRect = getBoundingClientRect(state2.elements.reference);
  var popperOffsets2 = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: "absolute",
    placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state2.modifiersData.offset;
  if (elementContext === popper && offsetData) {
    var offset2 = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function(key) {
      var multiply3 = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
      overflowOffsets[key] += offset2[axis] * multiply3;
    });
  }
  return overflowOffsets;
}

// node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js
function computeAutoPlacement(state2, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements2 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
    return getVariation(placement2) === variation;
  }) : basePlacements;
  var allowedPlacements = placements2.filter(function(placement2) {
    return allowedAutoPlacements.indexOf(placement2) >= 0;
  });
  if (allowedPlacements.length === 0) {
    allowedPlacements = placements2;
  }
  var overflows = allowedPlacements.reduce(function(acc, placement2) {
    acc[placement2] = detectOverflow(state2, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding
    })[getBasePlacement(placement2)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function(a, b) {
    return overflows[a] - overflows[b];
  });
}

// node_modules/@popperjs/core/lib/modifiers/flip.js
function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto2) {
    return [];
  }
  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}
function flip(_ref) {
  var state2 = _ref.state, options = _ref.options, name = _ref.name;
  if (state2.modifiersData[name]._skip) {
    return;
  }
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state2.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
    return acc.concat(getBasePlacement(placement2) === auto2 ? computeAutoPlacement(state2, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding,
      flipVariations,
      allowedAutoPlacements
    }) : placement2);
  }, []);
  var referenceRect = state2.rects.reference;
  var popperRect = state2.rects.popper;
  var checksMap = /* @__PURE__ */ new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements2[0];
  for (var i = 0; i < placements2.length; i++) {
    var placement = placements2[i];
    var _basePlacement = getBasePlacement(placement);
    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? "width" : "height";
    var overflow = detectOverflow(state2, {
      placement,
      boundary,
      rootBoundary,
      altBoundary,
      padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }
    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];
    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }
    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }
    if (checks.every(function(check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }
    checksMap.set(placement, checks);
  }
  if (makeFallbackChecks) {
    var numberOfChecks = flipVariations ? 3 : 1;
    var _loop = function _loop2(_i2) {
      var fittingPlacement = placements2.find(function(placement2) {
        var checks2 = checksMap.get(placement2);
        if (checks2) {
          return checks2.slice(0, _i2).every(function(check) {
            return check;
          });
        }
      });
      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };
    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);
      if (_ret === "break")
        break;
    }
  }
  if (state2.placement !== firstFittingPlacement) {
    state2.modifiersData[name]._skip = true;
    state2.placement = firstFittingPlacement;
    state2.reset = true;
  }
}
var flip_default = {
  name: "flip",
  enabled: true,
  phase: "main",
  fn: flip,
  requiresIfExists: ["offset"],
  data: {
    _skip: false
  }
};

// node_modules/@popperjs/core/lib/modifiers/hide.js
function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }
  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}
function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function(side) {
    return overflow[side] >= 0;
  });
}
function hide(_ref) {
  var state2 = _ref.state, name = _ref.name;
  var referenceRect = state2.rects.reference;
  var popperRect = state2.rects.popper;
  var preventedOffsets = state2.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state2, {
    elementContext: "reference"
  });
  var popperAltOverflow = detectOverflow(state2, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state2.modifiersData[name] = {
    referenceClippingOffsets,
    popperEscapeOffsets,
    isReferenceHidden,
    hasPopperEscaped
  };
  state2.attributes.popper = Object.assign({}, state2.attributes.popper, {
    "data-popper-reference-hidden": isReferenceHidden,
    "data-popper-escaped": hasPopperEscaped
  });
}
var hide_default = {
  name: "hide",
  enabled: true,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: hide
};

// node_modules/@popperjs/core/lib/modifiers/offset.js
function distanceAndSkiddingToXY(placement, rects, offset2) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
  var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
    placement
  })) : offset2, skidding = _ref[0], distance3 = _ref[1];
  skidding = skidding || 0;
  distance3 = (distance3 || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance3,
    y: skidding
  } : {
    x: skidding,
    y: distance3
  };
}
function offset(_ref2) {
  var state2 = _ref2.state, options = _ref2.options, name = _ref2.name;
  var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function(acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state2.rects, offset2);
    return acc;
  }, {});
  var _data$state$placement = data[state2.placement], x = _data$state$placement.x, y = _data$state$placement.y;
  if (state2.modifiersData.popperOffsets != null) {
    state2.modifiersData.popperOffsets.x += x;
    state2.modifiersData.popperOffsets.y += y;
  }
  state2.modifiersData[name] = data;
}
var offset_default = {
  name: "offset",
  enabled: true,
  phase: "main",
  requires: ["popperOffsets"],
  fn: offset
};

// node_modules/@popperjs/core/lib/modifiers/popperOffsets.js
function popperOffsets(_ref) {
  var state2 = _ref.state, name = _ref.name;
  state2.modifiersData[name] = computeOffsets({
    reference: state2.rects.reference,
    element: state2.rects.popper,
    strategy: "absolute",
    placement: state2.placement
  });
}
var popperOffsets_default = {
  name: "popperOffsets",
  enabled: true,
  phase: "read",
  fn: popperOffsets,
  data: {}
};

// node_modules/@popperjs/core/lib/utils/getAltAxis.js
function getAltAxis(axis) {
  return axis === "x" ? "y" : "x";
}

// node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
function preventOverflow(_ref) {
  var state2 = _ref.state, options = _ref.options, name = _ref.name;
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state2, {
    boundary,
    rootBoundary,
    padding,
    altBoundary
  });
  var basePlacement = getBasePlacement(state2.placement);
  var variation = getVariation(state2.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets2 = state2.modifiersData.popperOffsets;
  var referenceRect = state2.rects.reference;
  var popperRect = state2.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state2.rects, {
    placement: state2.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state2.modifiersData.offset ? state2.modifiersData.offset[state2.placement] : null;
  var data = {
    x: 0,
    y: 0
  };
  if (!popperOffsets2) {
    return;
  }
  if (checkMainAxis) {
    var _offsetModifierState$;
    var mainSide = mainAxis === "y" ? top : left;
    var altSide = mainAxis === "y" ? bottom : right;
    var len = mainAxis === "y" ? "height" : "width";
    var offset2 = popperOffsets2[mainAxis];
    var min2 = offset2 + overflow[mainSide];
    var max2 = offset2 - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
    var arrowElement = state2.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state2.modifiersData["arrow#persistent"] ? state2.modifiersData["arrow#persistent"].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide];
    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state2.elements.arrow && getOffsetParent(state2.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset2 + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset2 + maxOffset - offsetModifierValue;
    var preventedOffset = within(tether ? min(min2, tetherMin) : min2, offset2, tether ? max(max2, tetherMax) : max2);
    popperOffsets2[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset2;
  }
  if (checkAltAxis) {
    var _offsetModifierState$2;
    var _mainSide = mainAxis === "x" ? top : left;
    var _altSide = mainAxis === "x" ? bottom : right;
    var _offset = popperOffsets2[altAxis];
    var _len = altAxis === "y" ? "height" : "width";
    var _min = _offset + overflow[_mainSide];
    var _max = _offset - overflow[_altSide];
    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
    popperOffsets2[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }
  state2.modifiersData[name] = data;
}
var preventOverflow_default = {
  name: "preventOverflow",
  enabled: true,
  phase: "main",
  fn: preventOverflow,
  requiresIfExists: ["offset"]
};

// node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

// node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js
function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement2(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}

// node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = round(rect.width) / element.offsetWidth || 1;
  var scaleY = round(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
}
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  var isOffsetParentAnElement = isHTMLElement2(offsetParent);
  var offsetParentIsScaled = isHTMLElement2(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
  var scroll2 = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
    isScrollParent2(documentElement)) {
      scroll2 = getNodeScroll(offsetParent);
    }
    if (isHTMLElement2(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll2.scrollLeft - offsets.x,
    y: rect.top + scroll2.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

// node_modules/@popperjs/core/lib/utils/orderModifiers.js
function order(modifiers) {
  var map = /* @__PURE__ */ new Map();
  var visited = /* @__PURE__ */ new Set();
  var result = [];
  modifiers.forEach(function(modifier) {
    map.set(modifier.name, modifier);
  });
  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function(dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);
        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }
  modifiers.forEach(function(modifier) {
    if (!visited.has(modifier.name)) {
      sort(modifier);
    }
  });
  return result;
}
function orderModifiers(modifiers) {
  var orderedModifiers = order(modifiers);
  return modifierPhases.reduce(function(acc, phase) {
    return acc.concat(orderedModifiers.filter(function(modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

// node_modules/@popperjs/core/lib/utils/debounce.js
function debounce(fn2) {
  var pending;
  return function() {
    if (!pending) {
      pending = new Promise(function(resolve) {
        Promise.resolve().then(function() {
          pending = void 0;
          resolve(fn2());
        });
      });
    }
    return pending;
  };
}

// node_modules/@popperjs/core/lib/utils/mergeByName.js
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function(merged2, current) {
    var existing = merged2[current.name];
    merged2[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged2;
  }, {});
  return Object.keys(merged).map(function(key) {
    return merged[key];
  });
}

// node_modules/@popperjs/core/lib/createPopper.js
var DEFAULT_OPTIONS = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return !args.some(function(element) {
    return !(element && typeof element.getBoundingClientRect === "function");
  });
}
function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }
  var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers2 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper2(reference2, popper2, options) {
    if (options === void 0) {
      options = defaultOptions;
    }
    var state2 = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference2,
        popper: popper2
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state: state2,
      setOptions: function setOptions(setOptionsAction) {
        var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state2.options) : setOptionsAction;
        cleanupModifierEffects();
        state2.options = Object.assign({}, defaultOptions, state2.options, options2);
        state2.scrollParents = {
          reference: isElement2(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
          popper: listScrollParents(popper2)
        };
        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers2, state2.options.modifiers)));
        state2.orderedModifiers = orderedModifiers.filter(function(m) {
          return m.enabled;
        });
        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }
        var _state$elements = state2.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
        if (!areValidElements(reference3, popper3)) {
          return;
        }
        state2.rects = {
          reference: getCompositeRect(reference3, getOffsetParent(popper3), state2.options.strategy === "fixed"),
          popper: getLayoutRect(popper3)
        };
        state2.reset = false;
        state2.placement = state2.options.placement;
        state2.orderedModifiers.forEach(function(modifier) {
          return state2.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        for (var index2 = 0; index2 < state2.orderedModifiers.length; index2++) {
          if (state2.reset === true) {
            state2.reset = false;
            index2 = -1;
            continue;
          }
          var _state$orderedModifie = state2.orderedModifiers[index2], fn2 = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
          if (typeof fn2 === "function") {
            state2 = fn2({
              state: state2,
              options: _options,
              name,
              instance
            }) || state2;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: debounce(function() {
        return new Promise(function(resolve) {
          instance.forceUpdate();
          resolve(state2);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };
    if (!areValidElements(reference2, popper2)) {
      return instance;
    }
    instance.setOptions(options).then(function(state3) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state3);
      }
    });
    function runModifierEffects() {
      state2.orderedModifiers.forEach(function(_ref) {
        var name = _ref.name, _ref$options = _ref.options, options2 = _ref$options === void 0 ? {} : _ref$options, effect5 = _ref.effect;
        if (typeof effect5 === "function") {
          var cleanupFn = effect5({
            state: state2,
            name,
            instance,
            options: options2
          });
          var noopFn = function noopFn2() {
          };
          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }
    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function(fn2) {
        return fn2();
      });
      effectCleanupFns = [];
    }
    return instance;
  };
}

// node_modules/@popperjs/core/lib/popper.js
var defaultModifiers = [eventListeners_default, popperOffsets_default, computeStyles_default, applyStyles_default, offset_default, flip_default, preventOverflow_default, arrow_default, hide_default];
var createPopper = /* @__PURE__ */ popperGenerator({
  defaultModifiers
});

// node_modules/@chakra-ui/popper/dist/chunk-LUYFNC5G.mjs
var import_react50 = __toESM(require_react(), 1);
"use client";
function usePopper(props = {}) {
  const {
    enabled = true,
    modifiers,
    placement: placementProp = "bottom",
    strategy = "absolute",
    arrowPadding = 8,
    eventListeners = true,
    offset: offset2,
    gutter = 8,
    flip: flip2 = true,
    boundary = "clippingParents",
    preventOverflow: preventOverflow2 = true,
    matchWidth: matchWidth2,
    direction: direction2 = "ltr"
  } = props;
  const reference2 = (0, import_react50.useRef)(null);
  const popper2 = (0, import_react50.useRef)(null);
  const instance = (0, import_react50.useRef)(null);
  const placement = getPopperPlacement(placementProp, direction2);
  const cleanup = (0, import_react50.useRef)(() => {
  });
  const setupPopper = (0, import_react50.useCallback)(() => {
    var _a7;
    if (!enabled || !reference2.current || !popper2.current)
      return;
    (_a7 = cleanup.current) == null ? void 0 : _a7.call(cleanup);
    instance.current = createPopper(reference2.current, popper2.current, {
      placement,
      modifiers: [
        innerArrow,
        positionArrow,
        transformOrigin,
        {
          ...matchWidth,
          enabled: !!matchWidth2
        },
        {
          name: "eventListeners",
          ...getEventListenerOptions(eventListeners)
        },
        {
          name: "arrow",
          options: { padding: arrowPadding }
        },
        {
          name: "offset",
          options: {
            offset: offset2 != null ? offset2 : [0, gutter]
          }
        },
        {
          name: "flip",
          enabled: !!flip2,
          options: { padding: 8 }
        },
        {
          name: "preventOverflow",
          enabled: !!preventOverflow2,
          options: { boundary }
        },
        // allow users override internal modifiers
        ...modifiers != null ? modifiers : []
      ],
      strategy
    });
    instance.current.forceUpdate();
    cleanup.current = instance.current.destroy;
  }, [
    placement,
    enabled,
    modifiers,
    matchWidth2,
    eventListeners,
    arrowPadding,
    offset2,
    gutter,
    flip2,
    preventOverflow2,
    boundary,
    strategy
  ]);
  (0, import_react50.useEffect)(() => {
    return () => {
      var _a7;
      if (!reference2.current && !popper2.current) {
        (_a7 = instance.current) == null ? void 0 : _a7.destroy();
        instance.current = null;
      }
    };
  }, []);
  const referenceRef = (0, import_react50.useCallback)(
    (node) => {
      reference2.current = node;
      setupPopper();
    },
    [setupPopper]
  );
  const getReferenceProps = (0, import_react50.useCallback)(
    (props2 = {}, ref = null) => ({
      ...props2,
      ref: mergeRefs(referenceRef, ref)
    }),
    [referenceRef]
  );
  const popperRef = (0, import_react50.useCallback)(
    (node) => {
      popper2.current = node;
      setupPopper();
    },
    [setupPopper]
  );
  const getPopperProps = (0, import_react50.useCallback)(
    (props2 = {}, ref = null) => ({
      ...props2,
      ref: mergeRefs(popperRef, ref),
      style: {
        ...props2.style,
        position: strategy,
        minWidth: matchWidth2 ? void 0 : "max-content",
        inset: "0 auto auto 0"
      }
    }),
    [strategy, popperRef, matchWidth2]
  );
  const getArrowProps = (0, import_react50.useCallback)((props2 = {}, ref = null) => {
    const { size: size2, shadowColor, bg, style, ...rest } = props2;
    return {
      ...rest,
      ref,
      "data-popper-arrow": "",
      style: getArrowStyle2(props2)
    };
  }, []);
  const getArrowInnerProps = (0, import_react50.useCallback)(
    (props2 = {}, ref = null) => ({
      ...props2,
      ref,
      "data-popper-arrow-inner": ""
    }),
    []
  );
  return {
    update() {
      var _a7;
      (_a7 = instance.current) == null ? void 0 : _a7.update();
    },
    forceUpdate() {
      var _a7;
      (_a7 = instance.current) == null ? void 0 : _a7.forceUpdate();
    },
    transformOrigin: cssVars.transformOrigin.varRef,
    referenceRef,
    popperRef,
    getPopperProps,
    getArrowProps,
    getArrowInnerProps,
    getReferenceProps
  };
}
function getArrowStyle2(props) {
  const { size: size2, shadowColor, bg, style } = props;
  const computedStyle = { ...style, position: "absolute" };
  if (size2) {
    computedStyle["--popper-arrow-size"] = size2;
  }
  if (shadowColor) {
    computedStyle["--popper-arrow-shadow-color"] = shadowColor;
  }
  if (bg) {
    computedStyle["--popper-arrow-bg"] = bg;
  }
  return computedStyle;
}

// node_modules/@chakra-ui/popper/dist/index.mjs
"use client";

// node_modules/@chakra-ui/react-use-disclosure/dist/index.mjs
var import_react51 = __toESM(require_react(), 1);
"use client";
function useDisclosure(props = {}) {
  const {
    onClose: onCloseProp,
    onOpen: onOpenProp,
    isOpen: isOpenProp,
    id: idProp
  } = props;
  const handleOpen = useCallbackRef(onOpenProp);
  const handleClose = useCallbackRef(onCloseProp);
  const [isOpenState, setIsOpen] = (0, import_react51.useState)(props.defaultIsOpen || false);
  const isOpen = isOpenProp !== void 0 ? isOpenProp : isOpenState;
  const isControlled = isOpenProp !== void 0;
  const uid = (0, import_react51.useId)();
  const id3 = idProp != null ? idProp : `disclosure-${uid}`;
  const onClose = (0, import_react51.useCallback)(() => {
    if (!isControlled) {
      setIsOpen(false);
    }
    handleClose == null ? void 0 : handleClose();
  }, [isControlled, handleClose]);
  const onOpen = (0, import_react51.useCallback)(() => {
    if (!isControlled) {
      setIsOpen(true);
    }
    handleOpen == null ? void 0 : handleOpen();
  }, [isControlled, handleOpen]);
  const onToggle = (0, import_react51.useCallback)(() => {
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  }, [isOpen, onOpen, onClose]);
  function getButtonProps(props2 = {}) {
    return {
      ...props2,
      "aria-expanded": isOpen,
      "aria-controls": id3,
      onClick(event) {
        var _a7;
        (_a7 = props2.onClick) == null ? void 0 : _a7.call(props2, event);
        onToggle();
      }
    };
  }
  function getDisclosureProps(props2 = {}) {
    return {
      ...props2,
      hidden: !isOpen,
      id: id3
    };
  }
  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
    isControlled,
    getButtonProps,
    getDisclosureProps
  };
}

// node_modules/@chakra-ui/tooltip/dist/chunk-XRZH7COS.mjs
"use client";
var scale2 = {
  exit: {
    scale: 0.85,
    opacity: 0,
    transition: {
      opacity: { duration: 0.15, easings: "easeInOut" },
      scale: { duration: 0.2, easings: "easeInOut" }
    }
  },
  enter: {
    scale: 1,
    opacity: 1,
    transition: {
      opacity: { easings: "easeOut", duration: 0.2 },
      scale: { duration: 0.2, ease: [0.175, 0.885, 0.4, 1.1] }
    }
  }
};

// node_modules/@chakra-ui/tooltip/dist/chunk-P7BNLW77.mjs
var import_react52 = __toESM(require_react(), 1);
"use client";
var getDoc = (ref) => {
  var _a7;
  return ((_a7 = ref.current) == null ? void 0 : _a7.ownerDocument) || document;
};
var getWin = (ref) => {
  var _a7, _b5;
  return ((_b5 = (_a7 = ref.current) == null ? void 0 : _a7.ownerDocument) == null ? void 0 : _b5.defaultView) || window;
};
function useTooltip(props = {}) {
  const {
    openDelay = 0,
    closeDelay = 0,
    closeOnClick = true,
    closeOnMouseDown,
    closeOnScroll,
    closeOnPointerDown = closeOnMouseDown,
    closeOnEsc = true,
    onOpen: onOpenProp,
    onClose: onCloseProp,
    placement,
    id: id3,
    isOpen: isOpenProp,
    defaultIsOpen,
    arrowSize = 10,
    arrowShadowColor,
    arrowPadding,
    modifiers,
    isDisabled,
    gutter,
    offset: offset2,
    direction: direction2,
    ...htmlProps
  } = props;
  const { isOpen, onOpen, onClose } = useDisclosure({
    isOpen: isOpenProp,
    defaultIsOpen,
    onOpen: onOpenProp,
    onClose: onCloseProp
  });
  const { referenceRef, getPopperProps, getArrowInnerProps, getArrowProps } = usePopper({
    enabled: isOpen,
    placement,
    arrowPadding,
    modifiers,
    gutter,
    offset: offset2,
    direction: direction2
  });
  const uuid = (0, import_react52.useId)();
  const uid = id3 != null ? id3 : uuid;
  const tooltipId = `tooltip-${uid}`;
  const ref = (0, import_react52.useRef)(null);
  const enterTimeout = (0, import_react52.useRef)();
  const clearEnterTimeout = (0, import_react52.useCallback)(() => {
    if (enterTimeout.current) {
      clearTimeout(enterTimeout.current);
      enterTimeout.current = void 0;
    }
  }, []);
  const exitTimeout = (0, import_react52.useRef)();
  const clearExitTimeout = (0, import_react52.useCallback)(() => {
    if (exitTimeout.current) {
      clearTimeout(exitTimeout.current);
      exitTimeout.current = void 0;
    }
  }, []);
  const closeNow = (0, import_react52.useCallback)(() => {
    clearExitTimeout();
    onClose();
  }, [onClose, clearExitTimeout]);
  const dispatchCloseEvent = useCloseEvent(ref, closeNow);
  const openWithDelay = (0, import_react52.useCallback)(() => {
    if (!isDisabled && !enterTimeout.current) {
      if (isOpen)
        dispatchCloseEvent();
      const win = getWin(ref);
      enterTimeout.current = win.setTimeout(onOpen, openDelay);
    }
  }, [dispatchCloseEvent, isDisabled, isOpen, onOpen, openDelay]);
  const closeWithDelay = (0, import_react52.useCallback)(() => {
    clearEnterTimeout();
    const win = getWin(ref);
    exitTimeout.current = win.setTimeout(closeNow, closeDelay);
  }, [closeDelay, closeNow, clearEnterTimeout]);
  const onClick = (0, import_react52.useCallback)(() => {
    if (isOpen && closeOnClick) {
      closeWithDelay();
    }
  }, [closeOnClick, closeWithDelay, isOpen]);
  const onPointerDown = (0, import_react52.useCallback)(() => {
    if (isOpen && closeOnPointerDown) {
      closeWithDelay();
    }
  }, [closeOnPointerDown, closeWithDelay, isOpen]);
  const onKeyDown = (0, import_react52.useCallback)(
    (event) => {
      if (isOpen && event.key === "Escape") {
        closeWithDelay();
      }
    },
    [isOpen, closeWithDelay]
  );
  useEventListener(
    () => getDoc(ref),
    "keydown",
    closeOnEsc ? onKeyDown : void 0
  );
  useEventListener(
    () => {
      if (!closeOnScroll)
        return null;
      const node = ref.current;
      if (!node)
        return null;
      const scrollParent = getScrollParent(node);
      return scrollParent.localName === "body" ? getWin(ref) : scrollParent;
    },
    "scroll",
    () => {
      if (isOpen && closeOnScroll) {
        closeNow();
      }
    },
    { passive: true, capture: true }
  );
  (0, import_react52.useEffect)(() => {
    if (!isDisabled)
      return;
    clearEnterTimeout();
    if (isOpen)
      onClose();
  }, [isDisabled, isOpen, onClose, clearEnterTimeout]);
  (0, import_react52.useEffect)(() => {
    return () => {
      clearEnterTimeout();
      clearExitTimeout();
    };
  }, [clearEnterTimeout, clearExitTimeout]);
  useEventListener(() => ref.current, "pointerleave", closeWithDelay);
  const getTriggerProps = (0, import_react52.useCallback)(
    (props2 = {}, _ref = null) => {
      const triggerProps = {
        ...props2,
        ref: mergeRefs(ref, _ref, referenceRef),
        onPointerEnter: callAllHandlers(props2.onPointerEnter, (e) => {
          if (e.pointerType === "touch")
            return;
          openWithDelay();
        }),
        onClick: callAllHandlers(props2.onClick, onClick),
        onPointerDown: callAllHandlers(props2.onPointerDown, onPointerDown),
        onFocus: callAllHandlers(props2.onFocus, openWithDelay),
        onBlur: callAllHandlers(props2.onBlur, closeWithDelay),
        "aria-describedby": isOpen ? tooltipId : void 0
      };
      return triggerProps;
    },
    [
      openWithDelay,
      closeWithDelay,
      onPointerDown,
      isOpen,
      tooltipId,
      onClick,
      referenceRef
    ]
  );
  const getTooltipPositionerProps = (0, import_react52.useCallback)(
    (props2 = {}, forwardedRef = null) => getPopperProps(
      {
        ...props2,
        style: {
          ...props2.style,
          [cssVars.arrowSize.var]: arrowSize ? `${arrowSize}px` : void 0,
          [cssVars.arrowShadowColor.var]: arrowShadowColor
        }
      },
      forwardedRef
    ),
    [getPopperProps, arrowSize, arrowShadowColor]
  );
  const getTooltipProps = (0, import_react52.useCallback)(
    (props2 = {}, ref2 = null) => {
      const styles2 = {
        ...props2.style,
        position: "relative",
        transformOrigin: cssVars.transformOrigin.varRef
      };
      return {
        ref: ref2,
        ...htmlProps,
        ...props2,
        id: tooltipId,
        role: "tooltip",
        style: styles2
      };
    },
    [htmlProps, tooltipId]
  );
  return {
    isOpen,
    show: openWithDelay,
    hide: closeWithDelay,
    getTriggerProps,
    getTooltipProps,
    getTooltipPositionerProps,
    getArrowProps,
    getArrowInnerProps
  };
}
var closeEventName = "chakra-ui:close-tooltip";
function useCloseEvent(ref, close) {
  (0, import_react52.useEffect)(() => {
    const doc = getDoc(ref);
    doc.addEventListener(closeEventName, close);
    return () => doc.removeEventListener(closeEventName, close);
  }, [close, ref]);
  return () => {
    const doc = getDoc(ref);
    const win = getWin(ref);
    doc.dispatchEvent(new win.CustomEvent(closeEventName));
  };
}

// node_modules/@chakra-ui/tooltip/dist/chunk-TK6VMDNP.mjs
var import_react53 = __toESM(require_react(), 1);
var import_jsx_runtime21 = __toESM(require_jsx_runtime(), 1);
"use client";
function omit3(object, keysToOmit = []) {
  const clone = Object.assign({}, object);
  for (const key of keysToOmit) {
    if (key in clone) {
      delete clone[key];
    }
  }
  return clone;
}
function pick3(object, keysToPick) {
  const result = {};
  for (const key of keysToPick) {
    if (key in object) {
      result[key] = object[key];
    }
  }
  return result;
}
var MotionDiv = chakra(motion.div);
var Tooltip = forwardRef((props, ref) => {
  var _a7, _b5;
  const styles2 = useStyleConfig("Tooltip", props);
  const ownProps = omitThemingProps(props);
  const theme2 = useTheme();
  const {
    children,
    label,
    shouldWrapChildren,
    "aria-label": ariaLabel,
    hasArrow,
    bg,
    portalProps,
    background: background2,
    backgroundColor,
    bgColor,
    motionProps,
    ...rest
  } = ownProps;
  const userDefinedBg = (_b5 = (_a7 = background2 != null ? background2 : backgroundColor) != null ? _a7 : bg) != null ? _b5 : bgColor;
  if (userDefinedBg) {
    styles2.bg = userDefinedBg;
    const bgVar = getCSSVar(theme2, "colors", userDefinedBg);
    styles2[cssVars.arrowBg.var] = bgVar;
  }
  const tooltip = useTooltip({ ...rest, direction: theme2.direction });
  const shouldWrap = typeof children === "string" || shouldWrapChildren;
  let trigger;
  if (shouldWrap) {
    trigger = /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
      chakra.span,
      {
        display: "inline-block",
        tabIndex: 0,
        ...tooltip.getTriggerProps(),
        children
      }
    );
  } else {
    const child = import_react53.Children.only(children);
    trigger = (0, import_react53.cloneElement)(
      child,
      tooltip.getTriggerProps(child.props, child.ref)
    );
  }
  const hasAriaLabel = !!ariaLabel;
  const _tooltipProps = tooltip.getTooltipProps({}, ref);
  const tooltipProps = hasAriaLabel ? omit3(_tooltipProps, ["role", "id"]) : _tooltipProps;
  const srOnlyProps = pick3(_tooltipProps, ["role", "id"]);
  if (!label) {
    return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_jsx_runtime21.Fragment, { children });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(import_jsx_runtime21.Fragment, { children: [
    trigger,
    /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(AnimatePresence, { children: tooltip.isOpen && /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(Portal, { ...portalProps, children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
      chakra.div,
      {
        ...tooltip.getTooltipPositionerProps(),
        __css: {
          zIndex: styles2.zIndex,
          pointerEvents: "none"
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(
          MotionDiv,
          {
            variants: scale2,
            initial: "exit",
            animate: "enter",
            exit: "exit",
            ...motionProps,
            ...tooltipProps,
            __css: styles2,
            children: [
              label,
              hasAriaLabel && /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(chakra.span, { srOnly: true, ...srOnlyProps, children: ariaLabel }),
              hasArrow && /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
                chakra.div,
                {
                  "data-popper-arrow": true,
                  className: "chakra-tooltip__arrow-wrapper",
                  children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
                    chakra.div,
                    {
                      "data-popper-arrow-inner": true,
                      className: "chakra-tooltip__arrow",
                      __css: { bg: styles2.bg }
                    }
                  )
                }
              )
            ]
          }
        )
      }
    ) }) })
  ] });
});
Tooltip.displayName = "Tooltip";

// node_modules/@chakra-ui/tooltip/dist/index.mjs
"use client";

export {
  ChakraProvider2 as ChakraProvider,
  Badge,
  Tooltip
};
//# sourceMappingURL=/build/_shared/chunk-DXHHX322.js.map
