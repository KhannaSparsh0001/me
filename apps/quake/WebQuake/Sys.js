Sys = {};

Sys.events = ['oncontextmenu', 'onfocus', 'onkeydown', 'onkeyup', 'onmousedown', 'onmouseup', 'onmousewheel', 'onunload', 'onwheel'];

Sys.Quit = function()
{
	if (Sys.frame != null)
	{
		if (typeof cancelAnimationFrame !== 'undefined')
			cancelAnimationFrame(Sys.frame);
		else
			clearInterval(Sys.frame);
	}
	var i;
	for (i = 0; i < Sys.events.length; ++i)
		window[Sys.events[i]] = null;
	Host.Shutdown();
	document.body.style.cursor = 'auto';
	VID.mainwindow.style.display = 'none';
	if (COM.registered.value !== 0)
		document.getElementById('end2').style.display = 'inline';
	else
		document.getElementById('end1').style.display = 'inline';
	throw new Error;
};

Sys.Print = function(text)
{
	if (window.console != null)
		console.log(text);
};

Sys.Error = function(text)
{
	if (Sys.frame != null)
		clearInterval(Sys.frame);
	var i;
	for (i = 0; i < Sys.events.length; ++i)
		window[Sys.events[i]] = null;
	if (Host.initialized === true)
		Host.Shutdown();
	document.body.style.cursor = 'auto';
	i = Con.text.length - 25;
	if (i < 0)
		i = 0;
	if (window.console != null)
	{
		for (; i < Con.text.length; ++i)
			console.log(Con.text[i].text);
	}
	alert(text);
	throw new Error(text);
};

Sys.FloatTime = function()
{
	return Date.now() * 0.001 - Sys.oldtime;
};

Sys.InitEngine = function()
{
	if (Number.isNaN != null)
		Q.isNaN = Number.isNaN;
	else
		Q.isNaN = isNaN;

	var i;

	var cmdline = decodeURIComponent(document.location.search);
	var location = document.location;
	var argv = [location.href.substring(0, location.href.length - location.search.length)];
	if (cmdline.charCodeAt(0) === 63)
	{
		var text = '';
		var quotes = false;
		var c;
		for (i = 1; i < cmdline.length; ++i)
		{
			c = cmdline.charCodeAt(i);
			if ((c < 32) || (c > 127))
				continue;
			if (c === 34)
			{
				quotes = !quotes;
				continue;
			}
			if ((quotes === false) && (c === 32))
			{
				if (text.length === 0)
					continue;
				argv[argv.length] = text;
				text = '';
				continue;
			}
			text += cmdline.charAt(i);
		}
		if (text.length !== 0)
			argv[argv.length] = text;
	}
	argv.push('-nocdaudio');
	COM.InitArgv(argv);

	var elem = document.documentElement;
	VID.width = (elem.clientWidth <= 320) ? 320 : elem.clientWidth;
	VID.height = (elem.clientHeight <= 200) ? 200 : elem.clientHeight;

	Sys.scantokey = [];
	Sys.scantokey[8] = Key.k.backspace;
	Sys.scantokey[9] = Key.k.tab;
	Sys.scantokey[13] = Key.k.enter;
	Sys.scantokey[16] = Key.k.shift;
	Sys.scantokey[17] = Key.k.ctrl;
	Sys.scantokey[18] = Key.k.alt;
	Sys.scantokey[19] = Key.k.pause;
	Sys.scantokey[27] = Key.k.escape;
	Sys.scantokey[32] = Key.k.space;
	Sys.scantokey[33] = Sys.scantokey[105] = Key.k.pgup;
	Sys.scantokey[34] = Sys.scantokey[99] = Key.k.pgdn;
	Sys.scantokey[35] = Sys.scantokey[97] = Key.k.end;
	Sys.scantokey[36] = Sys.scantokey[103] = Key.k.home;
	Sys.scantokey[37] = Sys.scantokey[100] = Key.k.leftarrow;
	Sys.scantokey[38] = Sys.scantokey[104] = Key.k.uparrow;
	Sys.scantokey[39] = Sys.scantokey[102] = Key.k.rightarrow;
	Sys.scantokey[40] = Sys.scantokey[98] = Key.k.downarrow;
	Sys.scantokey[45] = Sys.scantokey[96] = Key.k.ins;
	Sys.scantokey[46] = Sys.scantokey[110] = Key.k.del;
	for (i = 48; i <= 57; ++i)
		Sys.scantokey[i] = i; // 0-9
	Sys.scantokey[59] = Sys.scantokey[186] = 59; // ;
	Sys.scantokey[61] = Sys.scantokey[187] = 61; // =
	for (i = 65; i <= 90; ++i)
		Sys.scantokey[i] = i + 32; // a-z
	Sys.scantokey[106] = 42; // *
	Sys.scantokey[107] = 43; // +
	Sys.scantokey[109] = Sys.scantokey[173] = Sys.scantokey[189] = 45; // -
	Sys.scantokey[111] = Sys.scantokey[191] = 47; // /
	for (i = 112; i <= 123; ++i)
		Sys.scantokey[i] = i - 112 + Key.k.f1; // f1-f12
	Sys.scantokey[188] = 44; // ,
	Sys.scantokey[190] = 46; // .
	Sys.scantokey[192] = 96; // `
	Sys.scantokey[219] = 91; // [
	Sys.scantokey[220] = 92; // backslash
	Sys.scantokey[221] = 93; // ]
	Sys.scantokey[222] = 39; // '

	Sys.oldtime = Date.now() * 0.001;

	Sys.Print('Host.Init\n');
	Host.Init();

	for (i = 0; i < Sys.events.length; ++i) {
		window[Sys.events[i]] = Sys[Sys.events[i]];
		document[Sys.events[i]] = Sys[Sys.events[i]];
	}
	document.addEventListener('keydown', Sys.onkeydown, false);
	document.addEventListener('keyup', Sys.onkeyup, false);

	function loop()
	{
		Host.Frame();
		Sys.frame = requestAnimationFrame(loop);
	}
	Sys.frame = requestAnimationFrame(loop);
};

Sys.GetCachedPak = function(key) {
	return new Promise(function(resolve) {
		try {
			if (!window.indexedDB) return resolve(null);
			var req = indexedDB.open('QuakeOfflineStore', 1);
			req.onupgradeneeded = function(e) {
				e.target.result.createObjectStore('assets');
			};
			req.onsuccess = function(e) {
				var db = e.target.result;
				var tx = db.transaction('assets', 'readonly');
				var store = tx.objectStore('assets');
				var getReq = store.get(key);
				getReq.onsuccess = function() {
					resolve(getReq.result || null);
				};
				getReq.onerror = function() { resolve(null); };
			};
			req.onerror = function() { resolve(null); };
		} catch (e) {
			resolve(null);
		}
	});
};

Sys.SaveCachedPak = function(key, buffer) {
	try {
		if (!window.indexedDB) return;
		var req = indexedDB.open('QuakeOfflineStore', 1);
		req.onupgradeneeded = function(e) {
			e.target.result.createObjectStore('assets');
		};
		req.onsuccess = function(e) {
			var db = e.target.result;
			var tx = db.transaction('assets', 'readwrite');
			tx.objectStore('assets').put(buffer, key);
		};
	} catch (e) {}
};

window.onload = function()
{
	var progress = document.getElementById('progress');
	if (progress == null)
	{
		Sys.InitEngine();
		return;
	}

	progress.innerText = 'Checking local asset cache...';

	var cacheKey = 'id1/pak0_v3.pak';
	var expectedSize = 18689235;

	Sys.GetCachedPak(cacheKey).then(function(cached) {
		if (cached != null && cached.byteLength === expectedSize)
		{
			progress.innerText = 'Loaded from local cache! Starting 3D World...';
			COM.packBuffers = { 'id1/pak0.pak': cached };
			setTimeout(Sys.InitEngine, 30);
			return;
		}

		progress.innerText = 'Connecting to Quake Assets...';

		fetch('id1/pak0.pak')
			.then(function(response) {
				if (!response.ok)
					throw new Error('HTTP ' + response.status + ' ' + response.statusText);
				var total = parseInt(response.headers.get('content-length'), 10) || expectedSize;
				var loaded = 0;
				var reader = response.body.getReader();
				var chunks = [];

				function pump() {
					return reader.read().then(function(result) {
						if (result.done) {
							var all = new Uint8Array(loaded);
							var offset = 0;
							for (var j = 0; j < chunks.length; ++j) {
								all.set(chunks[j], offset);
								offset += chunks[j].length;
							}
							chunks = null;
							COM.packBuffers = { 'id1/pak0.pak': all.buffer };
							Sys.SaveCachedPak(cacheKey, all.buffer);
							progress.innerText = 'Starting 3D World...';
							setTimeout(Sys.InitEngine, 30);
							return;
						}
						chunks.push(result.value);
						loaded += result.value.length;
						var pct = Math.round((loaded / total) * 100);
						var curMb = (loaded / (1024 * 1024)).toFixed(1);
						var totMb = (total / (1024 * 1024)).toFixed(1);
						progress.innerText = 'Loading Quake Assets: ' + pct + '% (' + curMb + ' / ' + totMb + ' MB)';
						return pump();
					});
				}
				return pump();
			})
			.catch(function(err) {
				console.error('Asset load error:', err);
				progress.innerText = 'Failed to load assets: ' + err.message;
			});
	});
};

Sys.onbeforeunload = null;

Sys.oncontextmenu = function(e)
{
	e.preventDefault();
};

Sys.onfocus = function()
{
	var i;
	for (i = 0; i < 256; ++i)
	{
		Key.Event(i);
		Key.down[i] = false;
	}
};

Sys.onkeydown = function(e)
{
	if (e.keyCode === 13 && e.altKey) {
		e.preventDefault();
		// Release stuck ALT key state
		Key.Event(Key.k.alt);
		Key.down[Key.k.alt] = false;
		if (typeof toggleFullscreen === 'function') {
			toggleFullscreen();
		}
		return;
	}
	var key = Sys.scantokey[e.keyCode];
	if (key == null)
		return;
	Key.Event(key, true);
	e.preventDefault();
};

Sys.onkeyup = function(e)
{
	var key = Sys.scantokey[e.keyCode];
	if (key == null)
		return;
	Key.Event(key);
	e.preventDefault();
};

Sys.onmousedown = function(e)
{
	var key;
	switch (e.which)
	{
	case 1:
		key = Key.k.mouse1;
		break;
	case 2:
		key = Key.k.mouse3;
		break;
	case 3:
		key = Key.k.mouse2;
		break;
	default:
		return;
	}
	Key.Event(key, true)
	e.preventDefault();
};

Sys.onmouseup = function(e)
{
	var key;
	switch (e.which)
	{
	case 1:
		key = Key.k.mouse1;
		break;
	case 2:
		key = Key.k.mouse3;
		break;
	case 3:
		key = Key.k.mouse2;
		break;
	default:
		return;
	}
	Key.Event(key)
	e.preventDefault();
};

Sys.onmousewheel = function(e)
{
	var key = e.wheelDeltaY > 0 ? Key.k.mwheelup : Key.k.mwheeldown;
	Key.Event(key, true);
	Key.Event(key);
	e.preventDefault();
};

Sys.onunload = function()
{
	Host.Shutdown();
};

Sys.onwheel = function(e)
{
	var key = e.deltaY < 0 ? Key.k.mwheelup : Key.k.mwheeldown;
	Key.Event(key, true);
	Key.Event(key);
	e.preventDefault();
};