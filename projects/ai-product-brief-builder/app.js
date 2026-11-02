const form = document.querySelector('#brief-form');
const output = document.querySelector('#output');

const escapeHtml = (value) => value.replace(/[&<>'"]/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[char]));

function buildBrief(data) {
  const { idea, user, pain, task, risk } = data;
  const sections = [
    ['问题与用户', `${user} 需要解决：${pain}`],
    ['产品假设', `如果产品能够让 ${user} 用 AI 完成“${task}”，他们会更快、更稳定地推进“${idea}”。`],
    ['MVP 范围', `先只覆盖一个高频场景：用户提供必要上下文，系统完成一份可编辑的初稿；不自动执行最终动作。`],
    ['关键风险', `${risk}。需要在首轮测试中明确用户是否信任输出、何时需要人工介入，以及数据应如何被处理。`],
    ['两周实验', `招募 5 位 ${user}，让他们在真实任务中试用原型。观察完成率、修改幅度与再次使用意愿；访谈他们不信任或放弃的时刻。`],
    ['成功信号', `至少 3 位测试者愿意在下一次相似任务中再次使用，并能清楚说出它替自己省下了哪一步。`]
  ];
  const markdown = `# ${idea}\n\n## 问题与用户\n${user} 需要解决：${pain}\n\n## 产品假设\n如果产品能够让 ${user} 用 AI 完成“${task}”，他们会更快、更稳定地推进“${idea}”。\n\n## MVP 范围\n先只覆盖一个高频场景：用户提供必要上下文，系统完成一份可编辑的初稿；不自动执行最终动作。\n\n## 关键风险\n${risk}\n\n## 两周实验\n招募 5 位 ${user}，在真实任务中试用原型，观察完成率、修改幅度与再次使用意愿。\n\n## 成功信号\n至少 3 位测试者愿意再次使用，并能说出它替自己省下了哪一步。`;
  return { sections, markdown };
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  const brief = buildBrief(data);
  output.classList.remove('empty');
  output.innerHTML = `<p class="eyebrow">PRODUCT BRIEF / V0.1</p><h2 class="brief-title">${escapeHtml(data.idea)}</h2>${brief.sections.map(([heading, body]) => `<section class="brief-section"><h3>${heading}</h3><p>${escapeHtml(body)}</p></section>`).join('')}<div class="actions"><button id="copy-brief" type="button">复制 Markdown</button><button id="reset-brief" type="button" class="secondary">重新开始</button></div>`;
  document.querySelector('#copy-brief').addEventListener('click', async () => {
    await navigator.clipboard.writeText(brief.markdown);
    document.querySelector('#copy-brief').textContent = '已复制 ✓';
  });
  document.querySelector('#reset-brief').addEventListener('click', () => { form.reset(); output.className = 'card output-card empty'; output.innerHTML = '<p class="eyebrow">YOUR BRIEF</p><h2>从一个具体问题开始。</h2><p>填写左侧内容后，这里会生成一份可复制、可讨论的 AI 产品简报。</p>'; });
});
