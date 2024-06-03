import{_ as s,c as i,o as a,a4 as n}from"./chunks/framework.C-FnFfGK.js";const g=JSON.parse('{"title":"Rew Context","description":"","frontmatter":{},"headers":[],"relativePath":"context.md","filePath":"context.md"}'),t={name:"context.md"},p=n(`<h1 id="rew-context" tabindex="-1">Rew Context <a class="header-anchor" href="#rew-context" aria-label="Permalink to &quot;Rew Context&quot;">​</a></h1><p>The rew context is similar to the nodejs context, with a few differences.</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">module</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	# Your module&#39;s exports</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">	exports</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">any</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	# run options</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">	options</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {} </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	# current file path</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">	filepath</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">string</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># App information, only on rew projects</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">app?</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	# App config</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">	config</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">		# App package name</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">		package</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">		# ...</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	# App root</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">	path</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">string</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">process</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	# Arguments</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">	argv</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">string[]</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	# Event Listener</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">	target</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">emitter</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	# Environment Variables</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">	env</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {}</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&lt;string, string&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">	# Current Working Directory</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">	cwd</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">() =&gt; string</span></span></code></pre></div>`,3),l=[p];function e(h,k,r,E,d,c){return a(),i("div",null,l)}const y=s(t,[["render",e]]);export{g as __pageData,y as default};
