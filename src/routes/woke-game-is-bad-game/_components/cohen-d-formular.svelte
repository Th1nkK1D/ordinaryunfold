<div class="mx-auto flex flex-col items-center gap-6 rounded border border-neutral-300 px-8 py-4">
	<!-- https://temml.org/ -->
	<div class="flex flex-row items-center justify-center gap-12">
		<!-- d = \frac{M_{1}-M_{2}}{SD_{pooled}} -->
		<math display="block">
			<mrow>
				<mi>d</mi>
				<mo>=</mo>
				<mfrac>
					<mrow>
						<msub>
							<mi>M</mi>
							<mn>1</mn>
						</msub>
						<mo>−</mo>
						<msub>
							<mi>M</mi>
							<mn>2</mn>
						</msub>
					</mrow>
					<mrow>
						<mi>S</mi>
						<msub>
							<mi>D</mi>
							<mrow>
								<mi>p</mi>
								<mi>o</mi>
								<mi>o</mi>
								<mi>l</mi>
								<mi>e</mi>
								<mi>d</mi>
							</mrow>
						</msub>
					</mrow>
				</mfrac>
			</mrow>
		</math>
		<span>where</span>
		<!-- SD_{pooled} = \sqrt{\frac{SD_{1}^{2}+SD_{2}^{2}}{2}} -->
		<math display="block">
			<mrow>
				<mi>S</mi>
				<msub>
					<mi>D</mi>
					<mrow>
						<mi>p</mi>
						<mi>o</mi>
						<mi>o</mi>
						<mi>l</mi>
						<mi>e</mi>
						<mi>d</mi>
					</mrow>
				</msub>
				<mo>=</mo>
				<msqrt>
					<mfrac>
						<mrow>
							<mi>S</mi>
							<msubsup>
								<mi>D</mi>
								<mn>1</mn>
								<mn>2</mn>
							</msubsup>
							<mo>+</mo>
							<mi>S</mi>
							<msubsup>
								<mi>D</mi>
								<mn>2</mn>
								<mn>2</mn>
							</msubsup>
						</mrow>
						<mn>2</mn>
					</mfrac>
				</msqrt>
			</mrow>
		</math>
	</div>

	<span>M = Mean (Average), SD = Standard Deviation</span>
</div>

<style lang="postcss">
	math {
		display: block math;
		@apply text-xl;
	}
	span {
		font-family: serif;
		@apply italic;
	}
</style>
