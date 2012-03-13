var Record = module.exports = function Record() {
	name = '', id = '', type = '', data = '', ttl = '', updated = '', created = '';
};

Record.prototype.init = function(arg) {
	this.name = arg.name;
	this.id = arg.id;
	this.type = arg.type;
	this.data = arg.data;
	this.ttl = arg.ttl;
	this.updated = arg.updated;
	this.created = arg.created;
}

Record.prototype.initAll = function(name, id, type, data, ttl, updated, created) {
	this.name = name;
	this.id = id;
	this.type = type;
	this.data = data;
	this.ttl = ttl;
	this.updated = updated;
	this.created = created;
}

Record.prototype.toJSON = function() {
	var output = '{ "name" : "' + this.name + '", "id" : "' + this.id + '", "type" : "' + this.type + '", ';
	output = output + '"data" : "' + this.data + '", "ttl" : "' + this.ttl + '", ';
	output = output + '"updated" : "' + this.updated + '", "created" : "' + this.created + '" }';
	return output;
}
