import{_ as s,c as i,o as a,a6 as n}from"./chunks/framework.MkVtTltr.js";const E=JSON.parse('{"title":"STDLIB","description":"","frontmatter":{},"headers":[],"relativePath":"stdlib.md","filePath":"stdlib.md"}'),e={name:"stdlib.md"},t=n(`<h1 id="stdlib" tabindex="-1">STDLIB <a class="header-anchor" href="#stdlib" aria-label="Permalink to &quot;STDLIB&quot;">​</a></h1><p>The <strong>Rew</strong> STDLIB is different from the <code>js</code> stdlib, along with <code>js</code>&#39;s core APIs, <strong>Rew</strong> has a few core functions that build up the <strong>Rew <a href="./context.html">Context</a></strong></p><h2 id="std-functions" tabindex="-1">STD Functions <a class="header-anchor" href="#std-functions" aria-label="Permalink to &quot;STD Functions&quot;">​</a></h2><p>All functions in the <a href="/rew-docs/core.html">core</a> are <code>stdlib</code> functions, and can be accessed with either <code>std.</code> or without it.</p><h2 id="the-std-and-global-scope" tabindex="-1">The std and global scope <a class="header-anchor" href="#the-std-and-global-scope" aria-label="Permalink to &quot;The std and global scope&quot;">​</a></h2><p>The <code>std</code> and global scopes are two different scopes as the global scope/context includes the <code>std</code> namespace while <code>std</code> doesn&#39;t include the global namespace/context.</p><h2 id="std-specific-functions" tabindex="-1">STD specific functions <a class="header-anchor" href="#std-specific-functions" aria-label="Permalink to &quot;STD specific functions&quot;">​</a></h2><p>The <code>std</code> namespace comes with a few functions that aren&#39;t in the global scope, they are set to be <code>prototype</code> functions, and can only be used using <code>std::</code>. Most of these functions are use-specific, and aren&#39;t generally useful.</p><ul><li><p><strong><code>std::define</code>:</strong></p><ul><li>Defines an item into the global context, allowing you to define items quickly. <strong>Example</strong>:<div class="language-coffee vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">coffee</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">std</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">define</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;something&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;value&#39;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> something </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># value</span></span></code></pre></div></li></ul></li><li><p><strong><code>std::attach</code>:</strong></p><ul><li>Attaches/injects an object into the global context. <strong>Example</strong>:<div class="language-coffee vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">coffee</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">std</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">attach</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;"> something</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;value&#39;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> something </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># value</span></span></code></pre></div></li></ul></li><li><p><strong><code>std::Main</code>:</strong></p><ul><li><p>Can only be used with <code>std::define</code>, can be used to define the main function/class that will run on execution. <strong>Example</strong>:</p><div class="language-coffee vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">coffee</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">std</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">define</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> std</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Main</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (argv) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> argv</span></span></code></pre></div></li><li><h3 id="std-main" tabindex="-1">STD::Main <a class="header-anchor" href="#std-main" aria-label="Permalink to &quot;STD::Main&quot;">​</a></h3><p>The <code>std::Main</code> along with <code>std::define</code> gives you the ability to define and export the main function from any context without you needing to export it.</p><p>While you can use functions with <code>std::Main</code>, you can also use classes.</p><h4 id="functions" tabindex="-1">Functions <a class="header-anchor" href="#functions" aria-label="Permalink to &quot;Functions&quot;">​</a></h4><p>Using functions is simple, all you have to do is calling the <code>std::Main</code> with a function as an argument, you can pass <code>argv</code> as a parameter which is completely optional. <strong>Example</strong>:</p><div class="language-coffee vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">coffee</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">std</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">define</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> std</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Main</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (argv) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> argv</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># or</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">std</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">define</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> std</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Main</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> -&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> print</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;Hello, World!&#39;</span></span></code></pre></div><h4 id="classes" tabindex="-1">Classes <a class="header-anchor" href="#classes" aria-label="Permalink to &quot;Classes&quot;">​</a></h4><p>Using classes with <code>std::Main</code> gives you the ability to organize your script, and do everything in the class definition. Keep in mind that the class you pass to <code>std::Main</code> has to have a static class method called <code>main</code>, which will behave as the main function. It can also optionally take the <code>argv</code> parameter. <strong>Example</strong>:</p><div class="language-coffee vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">coffee</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">std</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">define</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> std</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Main</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> class</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">main</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (argv) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> argv</span></span></code></pre></div><p>You can also use more static methods in the class, to use them inside of the <code>main</code> function.</p><div class="language-coffee vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">coffee</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">std</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">define</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> std</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Main</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> class</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  @name</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;World&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">printHello</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> -&gt;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    print</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Hello, #{</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">@name</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}!&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">main</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> -&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">printHello</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span></code></pre></div><p>To predefine other objects/imports into the main class. You can use the <code>@prepare</code> or <code>prepare</code> static function.</p><div class="language-coffee vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">coffee</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">std</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">define</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> std</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Main</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> class</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">prepare</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (merge) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    @myImport </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> imp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;/path/to/file&#39;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # or</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    merge</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">name</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;MyName&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # or</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    merge</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> imp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;something&#39;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # will merge the results of the import to the class</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">main</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> -&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> @myImport, @name</span></span></code></pre></div><blockquote><p>Note: The parameter passed into <code>@prepare</code> is only the function <code>merge</code>, used to inject objects into the class, meaning they will be accessible in every other function with <code>this.[name]</code> or <code>@[name]</code>.</p></blockquote></li></ul></li><li><p><strong><code>std::ns</code>:</strong></p><ul><li>Gives you the <code>std</code> namespace with all the <code>std</code> specific functions, as well as the global context. Can only be used with <a href="/rew-docs/using.html"><code>using</code></a> <a href="/rew-docs/using.html#usage-namespaces"><code>namespace</code></a>. <strong>Example</strong>:<div class="language-coffee vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">coffee</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">using</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> namespace</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> std</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ns</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> -&gt;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  define</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Main</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> class</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">prepare</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (merge) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">      merge</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> imp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;./myfile.coffee&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">main</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (argv) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">      attach</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { argv }</span></span></code></pre></div></li></ul></li></ul>`,9),h=[t];function l(p,k,d,o,r,c){return a(),i("div",null,h)}const y=s(e,[["render",l]]);export{E as __pageData,y as default};