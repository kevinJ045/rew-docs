import{_ as i,c as a,a4 as n,o as e}from"./chunks/framework.DzdlqNH7.js";const c=JSON.parse('{"title":"Rew Conf","description":"","frontmatter":{},"headers":[],"relativePath":"conf.md","filePath":"conf.md"}'),t={name:"conf.md"};function l(h,s,p,k,o,r){return e(),a("div",null,s[0]||(s[0]=[n(`<h1 id="rew-conf" tabindex="-1">Rew Conf <a class="header-anchor" href="#rew-conf" aria-label="Permalink to &quot;Rew Conf&quot;">​</a></h1><p>The <code>rew</code> conf module is the root structure of <code>rew</code>, it not only manages the local data for <code>rew</code>, like <a href="/rew-docs/pacman.html#repos">repos</a>, but it also stores your installed apps and all data for each app.</p><h2 id="root" tabindex="-1">Root <a class="header-anchor" href="#root" aria-label="Permalink to &quot;Root&quot;">​</a></h2><p>The <code>conf</code> root is the path where all your <code>conf</code> data is put, it is located at <code>~/.local/share/rew</code>, and every app you install and it&#39;s settings along with it&#39;s database is put there.</p><h2 id="managing-the-conf" tabindex="-1">Managing the <code>conf</code> <a class="header-anchor" href="#managing-the-conf" aria-label="Permalink to &quot;Managing the \`conf\`&quot;">​</a></h2><p>The built in <code>conf</code> command helps manage your <code>conf</code>.</p><p>Listing/Getting:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">rew</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> conf</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [packagename]/[</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">folder]</span></span></code></pre></div><p>Setting/Removing:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">rew</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> conf</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> remove</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">|</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">set</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [packagename]/[</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">folder]</span></span></code></pre></div><h2 id="conf-api" tabindex="-1">Conf Api <a class="header-anchor" href="#conf-api" aria-label="Permalink to &quot;Conf Api&quot;">​</a></h2><p>You can use the <code>conf</code> module in your code by importing the <code>conf</code> module.</p><p>Example:</p><div class="language-coffee vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">coffee</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">conf</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> imp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;conf&#39;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># when you import this,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># you automatically create a config center</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># at the rew root</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># this just puts this at _default.yaml</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">conf.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">set</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;mySetting&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;myValue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># this creates a animations.yaml, with the</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># default value of the second argument</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">animations</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> conf.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">optionCenter</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;animations&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  enable</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  speed</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;1x&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  easing</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;linear&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">print</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;speed is&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, animations.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;speed&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># You can also create static files</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># and store it at your conf</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">conf.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">staticFile</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;path/to/staticFile.txt&#39;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	# When you write, you can even pass</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	# buffers</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	# if you pass true in the end here, you will</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	# only write this if the file doesn&#39;t exist</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">write</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;this is the default value&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">read</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	# returns a buffer, unless you pass a string</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	# to the read function.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	# returns a json if you pass an empty object</span></span></code></pre></div>`,14)]))}const g=i(t,[["render",l]]);export{c as __pageData,g as default};